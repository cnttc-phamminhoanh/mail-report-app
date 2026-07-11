module.exports = `
select distinct i.su_no as [Supplier Code]   ,
i.su_name1 as[Supplier Name],
o.su_name11 as [Manufacturer],
i.pur_no  as  [PO No.],
cast(i.def21 as date) as [Inv Date],
i.check_date  as [Temp Rcv Audit Date],
pay_days  as [Payment Days],
datediff(day, cast(i.def21 as date), getdate() ) as [Days],
case when datediff(day, cast(i.def21 as date), getdate()) < pay_days then '0.Nearly'
when datediff(day, cast(i.def21 as date), getdate())  between pay_days and pay_days + 7 then '1.Late 0 ~ 7 Days'
when datediff(day, cast(i.def21 as date), getdate()) > pay_days + 7 then '2.Late > 7 Days'
when datediff(day, cast(i.def21 as date), getdate()) > pay_days + 30 then '3.Late > 30 Days' end as [Status],
e.emp_name as [Creator PO]
from [erp_t8_gi].[dbo].v_pur_notice_detail i with(nolock)
inner join [erp_t8_gi].[dbo].pur_in2 ii with(nolock) on  i.sheet_no = ii.notice_no and i.sheet_id = ii.notice_id 
inner join [erp_t8_gi].[dbo].pur_order1 o with(nolock) on o.sheet_no = i.pur_no
inner join [erp_t8_gi].[dbo].bas_pay_con c with(nolock) on o.pay_con = c.pay_con
left join [erp_t8_gi].[dbo].rpm_inv2 r with(nolock) on r.in_no = ii.sheet_no and r.in_id = ii.sheet_id
left join [erp_t8_gi].[dbo].bas_emp e with(nolock) on e.emp_no = o.create_user
where i.sheet_kind = 0 and i.sheet_sta = 1 and r.sheet_no is null and i.sheet_sta = 1
and c.pay_con in ('106', '11', '12', '13', '14', '15', '20', '24', '29', '31', '93')
and pay_days - 7 < datediff(day, cast(i.def21 as date), getdate() )
and i.sheet_type <> 'PTGI'
and o.sheet_date> '2025-05-31'
and o.sheet_no <> 'POV251107019'
order by [Status] desc
`
