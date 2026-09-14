module.exports = `

DECLARE @LimitDate date = DATEADD(day, -3, CAST(GETDATE() AS date));

IF OBJECT_ID('tempdb..#ExcludeGC') IS NOT NULL
    DROP TABLE #ExcludeGC;

IF OBJECT_ID('tempdb..#ExcludeGI') IS NOT NULL
    DROP TABLE #ExcludeGI;


CREATE TABLE #ExcludeGC
(
    user_no varchar(50) PRIMARY KEY
);

CREATE TABLE #ExcludeGI
(
    user_no varchar(50) PRIMARY KEY
);


INSERT INTO #ExcludeGC (user_no)
SELECT user_no
FROM sys_userpass
WHERE tree_path LIKE '%38437%';


INSERT INTO #ExcludeGI (user_no)
SELECT user_no
FROM erp_t8_GI.dbo.sys_userpass
WHERE tree_path LIKE '%G38437%';


SELECT
    'GC' AS 帐套,
    v.sheet_no AS 采购订单号,
    v.sheet_id AS 采购订单行,
    v.sheet_date AS 采购订单日期,

    CASE
        WHEN v.su_no = 'X004'
            THEN v.su_name11
        ELSE v.su_name1
    END AS 供应商,

    v.goods_no AS 料品编码,
    v.goods_name AS 料品名称,
    v.unit_no AS 单位,
    v.sheet_qty AS 订单数量,
    v.in_qty AS 入库数量,
    v.dif_qty AS 未入库数量,
    v.del_date AS 交期,

    b.del_date AS 最新回复交期,
    b.rem AS 最新恢复交期备注,

    v.def01 AS 客PO,
    v.def02 AS 客款号,
    v.create_user AS 制单用户,

    DATEDIFF(
        day,
        GETDATE(),
        COALESCE(b.del_date, v.del_date)
    ) AS 超期天数

FROM v_pur_order_detail1 v

LEFT JOIN
(
    SELECT
        sheet_no,
        sheet_id,
        del_date,
        rem,

        ROW_NUMBER() OVER
        (
            PARTITION BY sheet_no, sheet_id, rem
            ORDER BY del_date DESC
        ) AS rn

    FROM pur_order2_del1
) b
    ON b.sheet_no = v.sheet_no
    AND b.sheet_id = v.sheet_id
    AND b.rn = 1

WHERE v.sheet_sta = 1
    AND v.close_sw = 0
    AND v.dif_qty > 0
    AND v.goods_no <> 'M164000100001'
    AND LEFT(v.goods_no, 2) IN ('M4', 'M5', 'M6')
    AND CAST(
        COALESCE(b.del_date, v.del_date) AS date
    ) <= @LimitDate
    AND NOT EXISTS
    (
        SELECT 1
        FROM #ExcludeGC e
        WHERE e.user_no = v.create_user
    )


UNION ALL


SELECT
    'GI' AS 帐套,
    v.sheet_no AS 采购订单号,
    v.sheet_id AS 采购订单行,
    v.sheet_date AS 采购订单日期,

    CASE
        WHEN v.su_no = 'X004'
            THEN v.su_name11
        ELSE v.su_name1
    END AS 供应商,

    v.goods_no AS 料品编码,
    v.goods_name AS 料品名称,
    v.unit_no AS 单位,
    v.sheet_qty AS 订单数量,
    v.in_qty AS 入库数量,
    v.dif_qty AS 未入库数量,
    v.del_date AS 交期,

    b.del_date AS 最新回复交期,
    b.rem AS 最新恢复交期备注,

    v.def01 AS 客PO,
    v.def02 AS 客款号,
    v.create_user AS 制单用户,

    DATEDIFF(
        day,
        GETDATE(),
        COALESCE(b.del_date, v.del_date)
    ) AS 超期天数

FROM erp_t8_GI.dbo.v_pur_order_detail1 v

LEFT JOIN
(
    SELECT
        sheet_no,
        sheet_id,
        del_date,
        rem,

        ROW_NUMBER() OVER
        (
            PARTITION BY sheet_no, sheet_id, rem
            ORDER BY del_date DESC
        ) AS rn

    FROM erp_t8_GI.dbo.pur_order2_del1
) b
    ON b.sheet_no = v.sheet_no
    AND b.sheet_id = v.sheet_id
    AND b.rn = 1

WHERE v.sheet_sta = 1
    AND v.close_sw = 0
    AND v.dif_qty > 0
    AND v.goods_no <> 'M164000100001'
    AND LEFT(v.goods_no, 2) IN ('M4', 'M5', 'M6')
    AND CAST(
        COALESCE(b.del_date, v.del_date) AS date
    ) <= @LimitDate
    AND NOT EXISTS
    (
        SELECT 1
        FROM #ExcludeGI e
        WHERE e.user_no = v.create_user
    )


ORDER BY
    帐套,
    采购订单号,
    采购订单行;


`