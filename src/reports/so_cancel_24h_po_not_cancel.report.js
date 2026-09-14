module.exports = `

select 
  c.sheet_no                                                     as [SO No.], 
  c.sheet_id                                                     as [SO ID], 
  c.close_date                                                   as [SO Close Date], 
  c.close_user                                                   as [SO Close User], 
  a.sheet_no                                                     as [PO No.], 
  a.sheet_id                                                     as [PO ID], 
  a.goods_no                                                     as [Item Code], 
  g.goods_name                                                   as [Item Name], 
  a.plan_no                                                      as [Plan No.], 
  a.plan_id                                                      as [Plan ID], 
  a.unit_no                                                      as [Unit No.], 
  a.def01                                                        as [Cust Style], 
  a.def02                                                        as [CD PO], 
  n1.sheet_date                                                  as [Tracking Date], 
  a.def03                                                        as [Country], 
  format(a.sheet_qty,'#,##0.#')                                  as [PO Qty], 
  a.def04                                                        as [Season], 
  a.su_del_date                                                  as [Supply Latest Delivery Date], 
  datediff(day, c.close_date, getdate())                         as [Days (Close Date until Today)], 
  datediff(day, a1.sheet_date, getdate())                        as [Days (PO Date until Today)], 
  datediff(day, getdate(), a.su_del_date)                        as [Days to Delivery], 
  format(n.sheet_qty, '#,##0.#')                                 as [Receiving Qty]
from erp_t8_GI.dbo.pur_order2 a
inner join erp_t8_GI.dbo.pur_order1 a1 on a1.sheet_no = a.sheet_no
left join erp_t8_GI.dbo.pur_notice2 n on n.pur_no = a.sheet_no and a.sheet_id = n.pur_id
left join erp_t8_GI.dbo.pur_notice1 n1 on n.sheet_no = n1.sheet_no
inner join erp_t8_GI.dbo.pur_order1 b on a.sheet_no = b.sheet_no 
left join erp_t8_GI.dbo.bas_goods g on g.goods_no = a.goods_no 
left join (
  select sal_order2.sheet_no, sheet_id, sal_order2.close_sw, close_date, close_type, close_desc, close_user
  from erp_t8_GI.dbo.sal_order2 
  inner join sal_order1 on sal_order2.sheet_no = sal_order1.sheet_no 
  where sal_order2.close_sw = 1 and close_type between 101 and 107 and sheet_date >= '2024-01-01'
) c on a.ord_no = c.sheet_no and a.ord_id = c.sheet_id
where c.sheet_no is not null and a.close_sw = 0 and datediff(hour, c.close_date, getdate()) >= 24



`
