module.exports = `
select
o.bar_no as style,
o.child_cust_no,
o.child_cust_name1,
cast(min(o.del_date) as date) as crd,
datediff(day, getdate(), min(o.del_date)) as gap
from [erp_t8_GI].[dbo].v_sal_order_detail o with(nolock)
left join [erp_t8_GI].[dbo].sal_order1 o1 on o.sheet_no = o1.sheet_no
left join [erp_t8_GI].[dbo].sal_po_costing1 p with(nolock) on p.def04 = o.bar_no
where o.child_cust_no in ('10004', '10017', '10018') and o.sheet_sta = 1 and o.close_sw = 0
and p.sheet_no is null and o1.close_sw = 0 and (p.def04 is not null or len(p.def04) > 0)
and o.rem2 not like '%NOPO1%'
group by o.bar_no, o.child_cust_no, o.child_cust_name1
having datediff(day, getdate(), min(o.del_date)) <= 45
`
