module.exports = `
SELECT 
   
    company AS [PNE#],
    cust_name AS [CLIENT],
    packlist_no AS [INV#(DN#)],
    out_date AS [CRD],
    dc AS [DC#],
    CASE 
        WHEN cust_name IN ('HADDAD', 'Jamie Kay', 'H&O', 'Next') AND dc_desc LIKE 'UNKNOWN' 
        THEN ISNULL(dc_desc1, 'UNKNOWN') 
        ELSE dc_desc 
    END AS [DESTINATION],
    ship_mode AS [SHIP MODE],
    po_line AS [PO LINE],
    goods_no AS [Item Code],
    def03 AS [ITEM NO.],
    dif_code AS [Packing Method],
  
    order_qty AS [SO QTY],
    pro_qty AS [PRODUCTION],
    out_qty AS [ACTUAL SHIPPED QTY],
    out_pri AS [UNIT PRICE],
    out_amt AS [SHIPPED AMOUNT (USD)],
    CONCAT(CAST(ratio_qty * 100 AS INT), '%') AS [ACTUAL SHIPPED (%)],
    remain_qty AS [UNSHIPPED PO QTY]
    pri_dis AS [DISCOUNT GI],
    sheet_pri1 AS [UNIT PRICE GI],
    
    out_amt1 AS [AMOUNT GI (USD)],
    out_no AS [GI INVOICE #],
    ship_date AS [DATE OF GI INVOICE],
    inv_no AS [ASN],
    ship_date AS [SHIP OUT DATE],
    pay_date AS [SUBMIT PAYMENT DOCS DAY],   
    etd AS [ETD],                            
    fin_type AS [FINISHED],                  
    cab_type AS [CONT/LCL/AIR],

    code2 AS [INVOICE TERM],
    code1 AS [BL/FCR/AWB],
    ord_no AS [SO No.],
    ord_id AS [SO ID],
    rem1 AS [REMARK]

FROM [erp_t8_gi].[dbo].v_sal_shipment_detail_gi WITH (NOLOCK)
WHERE ship_date >= DATEADD(DAY, -6, CAST(GETDATE() AS DATE))
  AND ship_date < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))
`

