module.exports = `
SELECT
    v_sal_out2_sum_shipping_GI_def01.sheet_no       AS [Invoice],
    v_sal_out2_sum_shipping_GI_def01.sheet_date     AS [Date Of Invoice],
    c.cust_name1                                    AS [Customer],
    v_sal_out2_sum_shipping_GI_def01.inv_no         AS [DN#],
    v_sal_out2_sum_shipping_GI_def01.base_name_py   AS [Delivery Terms],
    v_sal_out2_sum_shipping_GI_def01.ord_no         AS [SO],
    v_sal_out2_sum_shipping_GI_def01.ord_id         AS [SO ID],
    v_sal_out2_sum_shipping_GI_def01.goods_no       AS [M3],
    v_sal_out2_sum_shipping_GI_def01.cust_ord_no    AS [PO],
    g.goods_model                                   AS [Season],
    v_sal_out2_sum_shipping_GI_def01.def07          AS [Line No],
    v_sal_out2_sum_shipping_GI_def01.bar_no + '-' + v_sal_out2_sum_shipping_GI_def01.dif_code AS [Customs style],
    v_sal_out2_sum_shipping_GI_def01.bar_no         AS [Style#],
    v_sal_out2_sum_shipping_GI_def01.dif_code       AS [Packing Method],
        v_sal_out2_sum_shipping_GI_def01.dc_no  as [DC#],
    v_sal_out2_sum_shipping_GI_def01.unit_pri       AS [Unit Price],
    v_sal_out2_sum_shipping_GI_def01.sheet_qty      AS [EX QTY],
    v_sal_out2_sum_shipping_GI_def01.unit_no        AS [Unit],
    v_sal_out2_sum_shipping_GI_def01.sheet_amt      AS [Amount],
    v_sal_out2_sum_shipping_GI_def01.cust_name1     AS [Buyer],
    pk1.def11                                       AS [ETD],
    o1.create_user                                  AS [Create User],
    v_sal_out2_sum_shipping_GI_def01.def04          AS [Date Of Customs Sheet],
    v_sal_out2_sum_shipping_GI_def01.def03           AS [Customs Sheet No]
FROM v_sal_out2_sum_shipping_GI_def01
LEFT JOIN sal_packlist1 pk1 WITH (NOLOCK)
    ON pk1.sheet_no = v_sal_out2_sum_shipping_GI_def01.inv_no
LEFT JOIN sal_out1 o1
    ON o1.sheet_no = v_sal_out2_sum_shipping_GI_def01.sheet_no
LEFT JOIN bas_cust c WITH (NOLOCK)
    ON c.cust_no = pk1.child_cust_no
LEFT JOIN bas_goods g WITH (NOLOCK)
    ON g.goods_no = v_sal_out2_sum_shipping_GI_def01.goods_no
WHERE v_sal_out2_sum_shipping_GI_def01.goods_no NOT LIKE 'Z%'
    AND ISNULL(v_sal_out2_sum_shipping_GI_def01.cust_ord_no, '') NOT LIKE 'GIstock'
    AND v_sal_out2_sum_shipping_GI_def01.sheet_date BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE();
`