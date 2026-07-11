module.exports = 
`
  --Garment PO Pending Receive Materials List
  SELECT 
    'GI' AS [Acc],
    case when left(po2.goods_no,2)='M1' THEN N'Main material (Fabric)' 
      when left(po2.goods_no,2)='M2' THEN N'Sewing material' 
    when left(po2.goods_no,2)='M3' THEN N'Packaging material'
    end as [Catogery],
    po1.create_user as [User No.],
    x.user_name as [User Name],
    cus.cust_name as [Customer],
    cus.brand as [Brand],
    po2.def02 AS [Cust Style],
    po2.def01 AS [Cust PO],
    po1.sheet_no as [PO No.],
    po2.sheet_id as [PO Line],
    po1.sheet_date as [PO Date],
    --po2.plan_req_date,
    --po2.def17 AS shipdate,
    po1.su_name11 as [Supplier],
    po2.goods_no as [Item No.],
    g.goods_name as [Item Name],
    po2.unit_no as [Unit],
    po2.sheet_qty as [Qty],
    SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0)) AS [In Stock Qty],
    po2.sheet_qty - SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0)) AS [Pending Qty],
    po2.del_date as [Delivery Date] ,
    del.del_date AS [New Deliv Date],
    del.rem AS [New Deliv Date Remark],
    DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), GETDATE()) AS [New Deliv Date vs Today],
    DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), po2.plan_req_date) AS [New Deliv Date vs PMC Request Date],
    --cast(b.del_date as date) as [CRD], 
    po2.def17 as [CRD], -- Nora: update 29.06.2026 (from Nghia)
    po2.def33 as [Raw Material Exception Log]
  FROM erp_t8_gi.dbo.pur_order1 po1
  INNER JOIN erp_t8_gi.dbo.pur_order2 po2 ON po2.sheet_no = po1.sheet_no
  INNER JOIN erp_t8_gi.dbo.bas_goods g ON g.goods_no = po2.goods_no 
  LEFT OUTER JOIN erp_t8_gi.dbo.pur_in2 in2 ON in2.pur_no = po1.sheet_no AND in2.pur_id = po2.sheet_id
  LEFT OUTER JOIN erp_t8_gi.dbo.v_pur_order2_del1_latest del ON del.sheet_no = po1.sheet_no AND del.sheet_id = po2.sheet_id
  left join erp_t8_gi.dbo.v_sal_order_detail b on po2.ord_no=b.sheet_no and po2.ord_id=b.sheet_id
  LEFT OUTER JOIN (
    SELECT * 
    FROM (
      SELECT g.bar_no, so1.cust_no1, c.cust_name1 as cust_name, so2.def26 as brand,
        ROW_NUMBER() OVER(PARTITION BY g.bar_no ORDER BY g.bar_no) AS id
      FROM erp_t8_gi.dbo.bas_goods g
        INNER JOIN erp_t8_gi.dbo.sal_order2 so2 ON so2.goods_no = g.goods_no
        INNER JOIN erp_t8_gi.dbo.sal_order1 so1 ON so1.sheet_no = so2.sheet_no
        INNER JOIN erp_t8_gi.dbo.bas_cust c ON c.cust_no = so1.cust_no1
      WHERE LEN(ISNULL(g.bar_no, '')) > 0 AND so1.cust_no1 IS NOT NULL
    ) x WHERE x.id = 1
  ) cus ON cus.bar_no = po2.def02
  left join erp_t8_gi.dbo.sys_userpass x on x.user_no = po1.create_user
  WHERE 
    po1.sheet_sta = '1' 
    AND po1.close_sw = '0' 
    AND po2.close_sw = '0'
    AND po2.goods_no <> 'M164000100001'  
    AND LEFT(po2.goods_no, 2) IN ('M1', 'M2', 'M3') 
    AND DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), GETDATE()) >= -3
    and po1.sheet_date>='2023-01-01'
  GROUP BY 
    po1.sheet_no,
    po2.sheet_id,
    po1.sheet_date,
    po2.plan_req_date,
    po2.def17,
    po1.su_name11,
    po2.goods_no,
    g.goods_name,
    po2.unit_no,
    po2.sheet_qty,
    po2.del_date,
    del.del_date,
    del.rem,
    po2.def01,
    po2.def02,
    po1.create_user,
    x.user_name,
    cus.cust_name, 
    cus.brand,
    cast(b.del_date as date), 
    po2.def33
  HAVING ABS(po2.sheet_qty - SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0))) > 0

  union all


  SELECT 
    'GC' AS [Acc],
    case when left(po2.goods_no,2)='M1' THEN N'Main material (Fabric)' 
      when left(po2.goods_no,2)='M2' THEN N'Sewing material'  
    when left(po2.goods_no,2)='M3' THEN N'Packaging material'
    end as [Catogery],
    po1.create_user as [User No.],
    x.user_name as [User Name],
    cus.cust_name as [Customer],
    cus.brand as [Brand],
    po2.def02 AS [Cust Style],
    po2.def01 AS [Cust PO],
    po1.sheet_no as [PO No.],
    po2.sheet_id as [PO Line],
    po1.sheet_date as [PO Date],
    --po2.plan_req_date,
    --po2.def17 AS shipdate,
    po1.su_name11 as [Supplier],
    po2.goods_no as [Item No.],
    g.goods_name as [Item Name],
    po2.unit_no as [Unit],
    po2.sheet_qty as [Qty],
    SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0)) AS [In Stock Qty],
    po2.sheet_qty - SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0)) AS [Pending Qty],
    po2.del_date as [Delivery Date] ,
    del.del_date AS [New Deliv Date],
    del.rem AS [New Deliv Date Remark],
    DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), GETDATE()) AS [New Deliv Date vs Today],
    DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), po2.plan_req_date) AS [New Deliv Date vs PMC Request Date],
    --cast(b.del_date as date) as [CRD], 
    po2.def17 as [CRD], -- Nora: update 29.06.2026 (from Nghia)
    po2.def33 as [Raw Material Exception Log]
  FROM erp_t8_gc.dbo.pur_order1 po1
  INNER JOIN erp_t8_gc.dbo.pur_order2 po2 ON po2.sheet_no = po1.sheet_no
  INNER JOIN erp_t8_gc.dbo.bas_goods g ON g.goods_no = po2.goods_no 
  LEFT OUTER JOIN erp_t8_gc.dbo.pur_in2 in2 ON in2.pur_no = po1.sheet_no AND in2.pur_id = po2.sheet_id
  LEFT OUTER JOIN erp_t8_gc.dbo.v_pur_order2_del1_latest del ON del.sheet_no = po1.sheet_no AND del.sheet_id = po2.sheet_id
  left join erp_t8_gc.dbo.v_sal_order_detail b on po2.ord_no=b.sheet_no and po2.ord_id=b.sheet_id
  LEFT OUTER JOIN (
    SELECT * 
    FROM (
      SELECT g.bar_no, so1.cust_no1, c.cust_name1 as cust_name, so2.def26 as brand,
        ROW_NUMBER() OVER(PARTITION BY g.bar_no ORDER BY g.bar_no) AS id
      FROM erp_t8_gc.dbo.bas_goods g
        INNER JOIN erp_t8_gc.dbo.sal_order2 so2 ON so2.goods_no = g.goods_no
        INNER JOIN erp_t8_gc.dbo.sal_order1 so1 ON so1.sheet_no = so2.sheet_no
        INNER JOIN erp_t8_gc.dbo.bas_cust c ON c.cust_no = so1.cust_no1
      WHERE LEN(ISNULL(g.bar_no, '')) > 0 AND so1.cust_no1 IS NOT NULL
    ) x WHERE x.id = 1
  ) cus ON cus.bar_no = po2.def02
  left join erp_t8_gc.dbo.sys_userpass x on x.user_no = po1.create_user
  WHERE 
    po1.sheet_sta = '1' 
    AND po1.close_sw = '0' 
    AND po2.close_sw = '0'
    AND po2.goods_no <> 'M164000100001'  
    AND LEFT(po2.goods_no, 2) IN ('M1', 'M2', 'M3') 
    AND DATEDIFF(DAY, ISNULL(del.del_date, po2.del_date), GETDATE()) >= -3
    and po1.sheet_date>='2023-01-01'
  GROUP BY 
    po1.sheet_no,
    po2.sheet_id,
    po1.sheet_date,
    po2.plan_req_date,
    po2.def17,
    po1.su_name11,
    po2.goods_no,
    g.goods_name,
    po2.unit_no,
    po2.sheet_qty,
    po2.del_date,
    del.del_date,
    del.rem,
    po2.def01,
    po2.def02,
    po1.create_user,
    x.user_name,
    cus.cust_name, 
    cus.brand,
    cast(b.del_date as date), 
    po2.def33
  HAVING ABS(po2.sheet_qty - SUM(ISNULL(in2.sheet_qty, 0) * ISNULL(in2.add_flag, 0))) > 0
`
