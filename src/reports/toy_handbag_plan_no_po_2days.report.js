module.exports = `
select 'GC' as 帐套,
a.sheet_no as 计划单号,
a.sheet_id as 计划单ID,
e.user_name as 计划单制单用户,
a.goods_no as 料品编码,
a.goods_name as 料品名称,
a.sheet_qty as 计划数量,
a.pur_qty as 采购数量,
cast(a.sheet_date as date)as 计划单日期,
cast(a.req_date as date)as 物料需求日期,
cast(case when left(a.goods_no,2)='M3' then DATEADD(dd,-35,a.req_date) else null end as date) as 包材最迟订料时间,
a.def02 as 客款号,
a.ord_no as 销售订单号,
a.ord_id as 销售订单ID,
a.def07 as 客户名称,
b.cust_ord_no as 客PO,
b.sheet_qty as 营业订单数量, 
b.check_date as 营业下单期,
convert(varchar, b.del_date, 23) as CRD期, 
case when left(a.goods_no,2)='M1' THEN '服装主料(Main material (Fabric))' 
     when left(a.goods_no,2)='M2' THEN '服装辅料(Sewing material)' 
	 when left(a.goods_no,2)='M3' THEN '服装包材(Packaging material)'

	 end as 物料类别,
	 DATEDIFF(day,a.sheet_date,getdate()) as 差异日期,
c.check_date as BOM审核日期,
case when f.sheet_no is not null then '已开采购单未终审(Pending final approval)' else '未开采购单(Pending issue PO)' end as 状态,
f.su_name11 as supplier,
f.sheet_no, 
a.create_user, 
bd.dept_no

from v_pur_plan_detail a
left join v_sal_order_detail b on a.ord_no=b.sheet_no and a.ord_id=b.sheet_id
left outer join bom_stru1 c with(nolock) on b.goods_no=c.parent_no
left outer join pur_plan2 d with(nolock) on a.sheet_no=d.sheet_no and a.sheet_id=d.sheet_id
left outer join sys_userpass e with(nolock) on a.create_user=e.user_no
left outer join v_pur_order_detail f with(nolock)on a.sheet_no=f.plan_no and a.sheet_id=f.plan_id
left outer join bas_emp emp with(nolock) on emp.emp_no = a.create_user
left outer join bas_dept bd with(nolock) on bd.dept_no = emp.dept_no
where a.pur_qty=0 and a.sheet_sta=1  and a.sheet_type not in ('PBGC','PBGGC') AND left(a.goods_no,2)in ('M1','M2','M3' )and DATEDIFF(day,a.sheet_date,getdate())>2 and a.sheet_qty<>0
and d.close_sw<>1 and a.goods_name not like '%共用料%'
union 
select 'GI' as 帐套,
a.sheet_no as 计划单号,
a.sheet_id as 计划单ID,
e.user_name as 计划单制单用户,
a.goods_no as 料品编码,
a.goods_name as 料品名称,
a.sheet_qty as 计划数量,
a.pur_qty as 采购数量,
cast(a.sheet_date as date) as 计划单日期,
cast(a.req_date as date) as 物料需求日期,
cast(case when left(a.goods_no,2)='M3' then DATEADD(dd,-35,a.req_date) else null end as date) as 包材最迟订料时间,
a.def02 as 客款号,
a.ord_no as 销售订单号,
a.ord_id as 销售订单ID,
a.def07 as 客户名称,
case when a.def01 is not null then a.def01 else b.cust_ord_no end as 客PO,
b.sheet_qty as 营业订单数量, 
b.check_date as 营业下单期,
case when a.def08 is not null then a.def08 else convert(varchar, b.del_date, 23) end as CRD期, 
case when left(a.goods_no,2)='M1' THEN '服装主料(Main material (Fabric))' 
     when left(a.goods_no,2)='M2' THEN '服装辅料(Sewing material)' 
	 when left(a.goods_no,2)='M3' THEN '服装包材(Packaging material)'

	 end as 物料类别,
	 DATEDIFF(day,a.sheet_date,getdate()) as 差异日期,
c.check_date as BOM审核日期,
case when f.sheet_no is not null then '已开采购单未终审(Pending final approval)' else '未开采购单(Pending issue PO)' end as 状态,
f.su_name11 as supplier,
f.sheet_no, 
a.create_user, 
bd.dept_name
from erp_t8_GI.dbo.v_pur_plan_detail a
left join erp_t8_GI.dbo.v_sal_order_detail b on a.ord_no=b.sheet_no and a.ord_id=b.sheet_id
left outer join erp_t8_GI.dbo.bom_stru1 c with(nolock) on b.goods_no=c.parent_no
left outer join erp_t8_GI.dbo.pur_plan2 d with(nolock) on a.sheet_no=d.sheet_no and a.sheet_id=d.sheet_id
left outer join erp_t8_GI.dbo.sys_userpass e with(nolock) on a.create_user=e.user_no
left outer join erp_t8_GI.dbo.v_pur_order_detail f on a.sheet_no=f.plan_no and a.sheet_id=f.plan_id
left outer join erp_t8_GI.dbo.bas_emp emp with(nolock) on emp.emp_no = a.create_user
left outer join erp_t8_GI.dbo.bas_dept bd with(nolock) on bd.dept_no = emp.dept_no
where a.pur_qty=0 and a.sheet_sta=1  and a.sheet_type not in ('PBGC','PBGGC') AND left(a.goods_no,2)in ('M1','M2','M3' )
	and DATEDIFF(day,a.sheet_date,getdate())>2 and a.sheet_qty<>0 
	and a.sheet_date >= '2024-01-01' 
	and d.close_sw<>1 and a.goods_name not like '%共用料%' and a.goods_name not like '%COMMON%' 
	or (a.goods_name like '%共用料%' and a.def02 like '%COMMON%' 
		and  a.pur_qty=0 and a.sheet_sta=1  
		and a.sheet_type not in ('PBGC','PBGGC') AND left(a.goods_no,2)in ('M1','M2','M3' )
		and DATEDIFF(day,a.sheet_date,getdate())>2 and a.sheet_qty<>0 
		and a.sheet_date >= '2024-01-01' and d.close_sw<>1)
	or (a.goods_name like '%COMMON%' and a.def02 like '%COMMON%' 
		and  a.pur_qty=0 and a.sheet_sta=1  
		and a.sheet_type not in ('PBGC','PBGGC') AND left(a.goods_no,2)in ('M1','M2','M3' )
		and DATEDIFF(day,a.sheet_date,getdate())>2 and a.sheet_qty<>0 
		and a.sheet_date >= '2024-01-01' and d.close_sw<>1)
ORDER BY 计划单日期;

`
