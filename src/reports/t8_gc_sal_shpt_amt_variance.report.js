module.exports = `
  select
convert(varchar(10),a.sheet_date,121) as 单据时间,
case when a.sheet_type='SHGGC' then '销售出货单(童装)' 
when a.sheet_type='SHTGC' then '销售出货单(玩具手袋)' end as 单据类型,
a.sheet_no as 销售出货单号,
a.def06 as 报关总金额,
b.sheet_amt as 总金额, 
b.sheet_amt-a.def06 as 差异金额,
a.def01 as 报关单号,
a.packlist_no as packlist单号
from sal_out1 a
left outer join v_sal_out_amt b on a.sheet_no=b.sheet_no
where (a.def06 =0 or b.sheet_amt=0 or (a.def06<>0 and b.sheet_amt<>0 and b.sheet_amt-a.def06 between 200 and -200)) and a.sheet_sta <>0 AND datediff(day,a.sheet_date,getdate())<=365
order by a.sheet_no


`
