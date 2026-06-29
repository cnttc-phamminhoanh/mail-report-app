module.exports = `
SELECT
    DATEDIFF(day, GETDATE(), ISNULL(o.del_date, o.def25)) AS [Days],
    ISNULL(o.del_date, o.def25) AS [CRD],
    o.sheet_no AS [SO No.],
    o.sheet_id AS [SO ID],
    o.goods_no AS [Finish Goods],
    o.dif_code AS [Style],
    b.child_no AS [M3 (BOM)],
    g2.goods_name AS [M3 Name],
    e.emp_name AS [Creator],
    c.cust_name1 AS [Customer],
    o.dif_code AS [Packing Method],
    s1.sheet_no AS [MPS No.]
FROM sal_order2 o WITH(NOLOCK)
INNER JOIN sal_order1 o1 WITH(NOLOCK) ON o1.sheet_no = o.sheet_no
LEFT JOIN mrp_mps2 s WITH(NOLOCK) ON s.ord_no = o.sheet_no AND s.ord_id = o.sheet_id
LEFT JOIN mrp_mps1 s1 WITH(NOLOCK) ON s1.sheet_no = s.sheet_no
INNER JOIN bom_config_dif2 b WITH(NOLOCK) ON b.parent_no = o.goods_no AND b.child_no LIKE 'M3%'
INNER JOIN bom_config_dif1 b1 WITH(NOLOCK) ON b.sheet_no = b1.sheet_no AND b1.dif_code = o.dif_code
LEFT JOIN mrp_mrp2 r WITH(NOLOCK) ON r.ord_no = o.sheet_no AND r.ord_id = o.sheet_id AND r.goods_no = b.child_no
LEFT JOIN bas_goods g WITH(NOLOCK) ON g.goods_no = o.goods_no
LEFT JOIN bas_goods g2 WITH(NOLOCK) ON g2.goods_no = b.child_no
LEFT JOIN bas_cust c WITH(NOLOCK) ON c.cust_no = o1.cust_no1
LEFT JOIN bas_emp e WITH(NOLOCK) ON e.emp_no = s1.create_user
WHERE r.goods_no IS NULL
AND o.close_sw = 0
AND o1.close_sw = 0
AND DATEDIFF(day, GETDATE(), ISNULL(o.del_date, o.def25)) <= 50
AND ISNULL(o.del_date, o.def25) >= '2025-06-01'
AND CHARINDEX('COMMON', g2.goods_name) = 0;
`
