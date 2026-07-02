module.exports = `
  SELECT
    CONVERT(VARCHAR(10), o1.sheet_date, 121) AS [Date],
    'Garment Sales Shpt' AS [Type],
    c.cust_name1 AS [Cust Name],
    o1.sheet_no AS [Sales Shpt No.],
    o1.def06 AS [CUSDEC Amt],
    SUM(
      IIF(
        p1.def17 = 'DHL',
        o2.sheet_pri * o2.sheet_qty,
        ROUND(o2.sheet_pri * o2.pri_dis, 2) * o2.sheet_qty
      )
    ) AS [Inv Amt],
    SUM(
      IIF(
        p1.def17 = 'DHL',
        o2.sheet_pri * o2.sheet_qty,
        ROUND(o2.sheet_pri * o2.pri_dis, 2) * o2.sheet_qty
      )
    ) - o1.def06 AS [Discrepancy],
    o1.def03 AS [CUSDEC No.],
    o1.def01 AS [Inv No.],
    o1.packlist_no AS [Packlist No.],
    p1.def17 AS [Shpt Type]
  FROM erp_t8_GI.dbo.sal_out1 o1
  INNER JOIN erp_t8_GI.dbo.sal_out2 o2 ON o2.sheet_no = o1.sheet_no
  INNER JOIN erp_t8_GI.dbo.bas_cust c ON c.cust_no = o1.child_cust_no
  LEFT JOIN erp_t8_GI.dbo.sal_packlist1 p1 ON p1.sheet_no = o1.packlist_no
  WHERE
    o1.sheet_sta <> 0
    AND o1.sheet_date >= '2022-05-01'
    AND o2.goods_no NOT LIKE 'Z%'
  GROUP BY
    o1.sheet_date,
    o1.sheet_no,
    o1.def06,
    o1.def03,
    o1.def01,
    o1.packlist_no,
    c.cust_name1,
    p1.def17
  HAVING
    ABS(
      SUM(
        IIF(
          p1.def17 = 'DHL',
          o2.sheet_pri * o2.sheet_qty,
          ROUND(o2.sheet_pri * o2.pri_dis, 2) * o2.sheet_qty
        )
      ) - o1.def06
    ) > 0
  ORDER BY o1.sheet_date DESC


`

