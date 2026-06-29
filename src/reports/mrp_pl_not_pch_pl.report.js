module.exports = `
SELECT 
    m2.sheet_no AS [MRP No.],
    
    CASE bg.goods_attr 
        WHEN 5 THEN '5.Service'
        WHEN 4 THEN '4.Other'
        WHEN 3 THEN '3.Raw Material'
        WHEN 2 THEN '2.Semi-finished Goods'
        WHEN 1 THEN '1.Finished Goods'
    END AS [Attributes],
    
    m2.ord_no AS [SO No. ],
    
    m2.goods_no AS [Item Code ],
    
    bg.goods_name AS [Item Name ],
    
    m2.close_sw AS [Ending ],
    
    m2.def03 AS [Country],
    
    m2.rem AS [Remark],
    
    m2.unit_no AS [Unit ],
    
    CAST(m2.req_qty AS FLOAT) AS [Gross Demand ],
    
    CAST(m2.dis_qty AS FLOAT) AS [Deduct Stock Qty ],
    
    CAST(m2.def08 AS FLOAT) AS [Inventory Qty ],
    
    CAST(m2.need_plan_qty AS FLOAT) AS [Required Release ],
    
    CAST(m2.def20 AS FLOAT) AS [Convert into LB ],
    
    CAST(m2.def06 AS FLOAT) AS [Usage ],
    
    m2.def02 AS [Style ],
    
    m2.def01 AS [Cust PO No. ],
    
    m2.def14 AS [Delivery Date ],
    
    m2.def05 AS [Tracking Date ],
    
    m2.def04 AS [Season ],
    
    m2.close_user AS [Closed User ],
    
    m1.create_user AS [Create User ],
    
    CAST(m2.qty01 AS FLOAT) AS Qty01,
    CAST(m2.qty02 AS FLOAT) AS Qty02,
    CAST(m2.qty03 AS FLOAT) AS Qty03,
    CAST(m2.qty04 AS FLOAT) AS Qty04,
    CAST(m2.qty05 AS FLOAT) AS Qty05,
    CAST(m2.qty06 AS FLOAT) AS Qty06,
    CAST(m2.qty07 AS FLOAT) AS Qty07,
    CAST(m2.qty08 AS FLOAT) AS Qty08,
    CAST(m2.qty09 AS FLOAT) AS Qty09,
    CAST(m2.qty10 AS FLOAT) AS Qty10,
    CAST(m2.qty11 AS FLOAT) AS Qty11,
    CAST(m2.qty12 AS FLOAT) AS Qty12,
    CAST(m2.qty13 AS FLOAT) AS Qty13,
    CAST(m2.qty14 AS FLOAT) AS Qty14,
    CAST(m2.qty15 AS FLOAT) AS Qty15,
    CAST(m2.qty16 AS FLOAT) AS Qty16

FROM [erp_t8_gi].[dbo].mrp_mrp2 m2
LEFT JOIN [erp_t8_gi].[dbo].bas_goods bg 
    ON bg.goods_no = m2.goods_no
LEFT JOIN [erp_t8_gi].[dbo].mrp_mrp1 m1 
    ON m1.sheet_no = m2.sheet_no

WHERE 
    (m2.pur_plan_qty = 0 OR m2.pur_plan_qty IS NULL)
    AND m2.close_sw = 0
    AND m2.need_plan_date >= DATEADD(DAY, -15, GETDATE())
    AND m2.need_plan_date <= GETDATE()

ORDER BY m2.need_plan_date DESC, m2.sheet_no

`