## Oracle常用时间操作
1. dd-mon-yy格式转换为yyyy-mm-dd
```
select to_char(to_date('01-5月-05','dd-mon-yy'),'yyyy-mm-dd') from dual
```
2. 计算2009-05-01与2008-04-30的月份差
```
select (extract(year from to_date('2009-05-01 ','yyyy-mm-dd')) - extract(year from to_date('2008-04-30','yyyy-mm-dd'))) * 12 + 
        extract(month from to_date('2008-05-01','yyyy-mm-dd')) - extract(month from to_date('2008-04-30','yyyy-mm-dd')) months from dual; 
--extract:用于从日期时间值中取得所需要的特定数据 year.month.day.hour.minute.second

select ceil((to_date('2009-05-01','yyyy-mm-dd') - to_date('2008-04-30','yyyy-mm-dd'))/30) from dual;
select ceil(months_between(to_date('2009-05-01','yyyy-mm-dd'),to_date('2008-04-30','yyyy-mm-dd'))) from dual; 

--查看现在距2008-08-08已过去了多少个月
select ceil(months_between(sysdate,to_date('2008-08-08','yyyy-mm-dd'))) from dual; 
```
3. 年月日时分秒计算
```
select to_date('2010-04-27 13:23:44','yyyy-mm-dd hh24:mi:ss') from dual; --字符串转换成日期      
select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') as nowTime from dual;  --日期转化为字符串   

select to_char(sysdate,'yyyy') as nowYear   from dual;    --获取时间的年    'yyyy.yyy.yy.y'分别显示不同年的计数位

--获取时间的月 
select to_char(sysdate,'mm')    from dual;     -- 04
select to_char(sysdate,'mon')   from dual;     --中文版：4月  英文版: apr
select to_char(sysdate,'month') from dual;     --中文版：4月  英文版: april

--获取时间的日   
select to_char(sysdate,'dd')    from dual;      --当月的第几天
select to_char(sysdate,'ddd')   from dual;      --当年的第几天
select to_char(sysdate,'d')     from dual;      --当周的第几天  select to_char(sysdate,'D') from dual;
select to_char(sysdate,'ddspth')from dual;      --英文显示当月的第几天

--获取时间的时   
select to_char(sysdate,'hh24')  from dual;      --24小时制
select to_char(sysdate,'hh')    from dual;      --12小时制

--获取时间的分   
select to_char(sysdate,'mi')    from dual;  
--获取时间的秒     
select to_char(sysdate,'ss')    from dual;  
```
4. 查看星期几
```
select to_char(sysdate,'dy')    from dual;      --星期几        中文版：星期二  英文版：Tue
select to_char(sysdate,'day')   from dual;      --星期几        中文版：星期二  英文版：Tuesday

--英文显示星期几: to_date('2010-04-27','yyyy-mm-dd') 部分可换成sysdate或其他时间    
select to_char(to_date('2010-04-27','yyyy-mm-dd'),'day','NLS_DATE_LANGUAGE = American') from dual;  --小写
select to_char(to_date('2010-04-27','yyyy-mm-dd'),'DAY','NLS_DATE_LANGUAGE = American') from dual;  --大写  
select to_char(to_date('2010-04-27','yyyy-mm-dd'),'Day','NLS_DATE_LANGUAGE = American') from dual;  --首字母大写 

--设置会话日期语言格式 : alter session set nls_date_language='american';   
```
5. next_day函数:计算机当前日期的下一个星期几 
```
next_day(sysdate,6)是从当前开始下一个星期五(n-1)。后面的数字是从星期日开始算起。　   
1　2　3　4　5　6　7　   
日 一 二 三 四 五 六　

--本月的第一个星期一
select next_day(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),'星期一') from dual;
select next_day(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),2) from dual

--计算上一个月的第一个星期一
select next_day(add_months(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),-1),'星期一') from dual;
select next_day(add_months(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),-1),2) from dual;

--计算下一个月的第一个星期一
select next_day(add_months(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),1),'星期一') from dual;
select next_day(add_months(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),1),2) from dual;
```
6. 判断一年是不是闰年
```
--如果是28-平年, 29-闰年
select to_char( last_day( to_date('02' ||&year,'mmyyyy') ), 'dd' ) from dual;
select to_char( last_day( to_date('02' ||extract(year from sysdate),'mmyyyy') ), 'dd' ) from dual;
select to_char(last_day(add_months(trunc(sysdate,'year'),2)-1),'dd') from dual;
select decode(to_char(last_day(to_date(to_char(sysdate,'yyyy')||'-02-01','yyyy-mm-dd')),'dd'),'28','平年','闰年') from dual
```
7. 计算今年的天数
```
select add_months(trunc(sysdate,'year'), 12) - trunc(sysdate,'year') from dual   
```

8. 计算本月的第一天
```
select to_char(last_day(add_months(sysdate,-1))+1,'yyyy-mm-dd') from dual;
select to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd')  from dual;
```
9. 计算本月最后一天
```
--select last_day(sysdate)from dual;
select last_day(trunc(sysdate)) from dual;
select trunc(last_day(add_months(sysdate,0))) from dual;
select add_months(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'),1)-1 from dual;
select last_day(to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd'))  from dual;
select add_months(to_date(to_char(last_day(add_months(sysdate,-1))+1,'yyyy-mm-dd'),'yyyy-mm-dd'),1)-1 from dual;
```
10. 上个月最后一天
```
select trunc(last_day(add_months(sysdate,-1))) from dual;
select to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd')-1  from dual;
--select trunc(last_day(add_months(sysdate,-1)))+1-1/24/60/60 from dual
```
11. last_day(trunc(sysdate))扩展
```
--本月第一天
select add_months(last_day(trunc(sysdate)),-1)+1 from dual;
--上个月第一天
select add_months(last_day(trunc(sysdate)),-2)+1 from dual;
--下个月第一天
select add_months(last_day(trunc(sysdate)),0)+1 from dual;
--本月最后一天
select last_day(trunc(sysdate))from dual;
--上个月最后一天
select add_months(last_day(trunc(sysdate)),-1) from dual;
--下个月最后一天
select add_months(last_day(trunc(sysdate)),1) from dual;
--计算本月的天数
select last_day(trunc(sysdate)) - (add_months(last_day(trunc(sysdate)),-1)+1)+1 from dual;
--select trunc(last_day(sysdate))- to_date(to_char(sysdate,'yyyy-mm')||'-01','yyyy-mm-dd')+1 from dual
--计算上个月的天数
select add_months(last_day(trunc(sysdate)),-1) - (add_months(last_day(trunc(sysdate)),-2)+1)+1 from dual;
--计算下个月的天数
select add_months(last_day(trunc(sysdate)),1) - (add_months(last_day(trunc(sysdate)),0)+1)+1 from dual;
```
12. trunc(sysdate,'month') 扩展
```
--本月的第一天
select trunc(sysdate,'month') from dual;
--本月最后一天
select last_day(trunc(sysdate, 'month')) from dual;
--上个月的第一天
select trunc(trunc(sysdate, 'month') - 1, 'month') from dual;
--上个月的最后一天
select trunc(sysdate, 'month') - 1 from dual;
--下个月的第一天
select last_day(trunc(sysdate, 'month'))+1 from dual;
--下个月的最后一天
select last_day(last_day(trunc(sysdate, 'month'))+1)from dual;
```
13. 计算本年的第一天
```
select trunc(sysdate,'year') from dual;
select trunc(sysdate,'yyyy') from dual;
select to_date(to_char(sysdate,'yyyy')||'-01-01','yyyy-mm-dd') from dual;
```
14. 计算本年的最后一天
```
select add_months(trunc(sysdate,'year'),12)-1 from dual;
select to_date(to_char(sysdate,'yyyy')||'-12-31','yyyy-mm-dd') from dual;
select add_months(to_date(to_char(sysdate,'yyyy')||'-01-01','yyyy-mm-dd'),12)-1 from dual;
select add_months(last_day(to_date(to_char(sysdate,'yyyy')||'-01-01','yyyy-mm-dd')),11) from dual;
```
15. 计算两个日期间的星期几的总数
```
--计算2010-04-28至2010-10-01之间的工作日的总数
select count(*)      
  from (select rownum-1 rnum      
          from all_objects      
         where rownum <= to_date('2010-10-01','yyyy-mm-dd') - to_date('2010-04-28','yyyy-mm-dd')+1      
        )      
 where to_char( to_date('2010-04-28','yyyy-mm-dd')+rnum, 'day')not in ( '星期六', '星期日' );  

--替换说明: all_objects --> dual;  where rownum --> connect by rownum/level; day --> d/D, dy
--"星期六"、"星期日" --> 1,7 或单个数字 'sat'.'sun'; not in --> in; count(*) --> * ; 日期可替换成替他形式.
```
16. 查看当前系统时间的四种方法
```
select sysdate from dual;
select current_date from dual;
select add_months(sysdate, 0)  from dual;
select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') from dual;
```
17. 计算本周星期几的日期
```
--1-7:oracle默认一周从星期日开始
select trunc(sysdate,'day')+1 from dual; 
select trunc(sysdate,'day')+2 from dual; 
select trunc(sysdate,'day')+3 from dual; 
select trunc(sysdate,'day')+4 from dual; 
select trunc(sysdate,'day')+5 from dual;
select trunc(sysdate,'day')+6 from dual;
select trunc(sysdate,'day')+7 from dual;

--0-6:iso默认一周从星期一开始
select trunc(sysdate,'iw')+0 from dual; 
select trunc(sysdate,'iw')+1 from dual; 
select trunc(sysdate,'iw')+2 from dual; 
select trunc(sysdate,'iw')+3 from dual; 
select trunc(sysdate,'iw')+4 from dual; 
select trunc(sysdate,'iw')+5 from dual;
select trunc(sysdate,'iw')+6 from dual;
```

18. 如何求一年的总天数,把下一年的1.1减当年的1.1
```
select add_months(trunc(sysdate,'yyyy'),12)-trunc(sysdate,'yyyy') from dual 

select case when (mod(to_number(to_char(sysdate,'YYYY')),4)  =0 or mod(to_number(to_char(sysdate,'YYYY')),100 ) =0) 
              and mod(to_number(to_char(sysdate,'YYYY')),400 ) <>0  
            then 366 else 365 
        end total_days 
from dual
```
19. 计算奥运会距离现在的时间
```
select '奥运会距今已过:' || trunc(dt) || '天' || 
      trunc((dt - trunc(dt)) * 24) || '小时' ||
      trunc((dt * 24 - trunc(dt * 24)) * 60) || '分' ||
      trunc((dt * 1440 - trunc(dt * 1440)) *60) || '秒'
 from(
      select sysdate - to_date('2008-08-08 20:00:00', 'yyyy-mm-dd hh24:mi:ss') dt 
        from dual
       );
      
select extract(day from dt) "天",
       extract(hour from dt) "小时",
       extract(minute from dt) "分",
       trunc(extract(second from dt)) "秒"
  from (
        select systimestamp - to_date('2008-08-08 20:00:00', 'yyyy-mm-dd hh24:mi:ss') dt
          from dual
       );
```

20. 时间格式范围
```
hh24:24小时格式下时间范围为： 0:00:00 - 23:59:59    
hh12:12小时格式下时间范围为： 1:00:00 - 12:59:59 
```
21. 时间为null的情况
```
select to_date(null) from dual;
select to_char(null) from dual;
```
22. 时间格式的设置
```
--系统设置
alter system  set NLS_DATE_LANGUAGE = American   
--会话设置   
alter session set NLS_DATE_LANGUAGE = American 
```
23. 计算一个季度的总天数
```
select last_day(to_date(to_char(sysdate,'yyyy-')||lpad(floor(to_number(to_char(sysdate,'mm'))/3)*3+3,2,'0')||'-01','yyyy-mm-dd'))
       -to_date(to_char(sysdate,'yyyy-')||lpad(floor(to_number(to_char(sysdate,'mm'))/3)*3+1,2,'0')||'-01','yyyy-mm-dd')
       +1
  from dual;
```
24. 判断当前时间是上午还是?
```
select case when to_number(to_char(sysdate,'hh24')) between 6 and 11  then '上午'
            when to_number(to_char(sysdate,'hh24')) between 12 and 18 then '下午'
            else '晚上'
       end
  from dual;

select case when to_number(to_char(sysdate,'hh24')) between 1 and 5  then '凌晨'
            when to_number(to_char(sysdate,'hh24')) between 6 and 11  then '上午'
            when to_number(to_char(sysdate,'hh24')) between 12 and 18 then '下午'
            when to_number(to_char(sysdate,'hh24')) between 19 and 24 then '晚上'
       end
  from dual;
```
25. 查找月份差:months_between(date,date)
```
select months_between(to_date('01-31-2010','mm-dd-yyyy'),to_date('12-31-2009','mm-dd-yyyy')) "months" from dual;      
```
26. 查看某一天距今天的天数
```
select trunc(sysdate)-to_date('20050101','yyyymmdd') from dual;
```
27. 一年以后的今天
```
--   一年以后的今天: select add_months(sysdate,12)  from dual;          
--   一年以前的今天: select add_months(sysdate,-12) from dual;
--   系统当前时间:   select add_months(sysdate, 0)  from dual;
```
28. 从今天零点之后经过的秒数
```
select to_char(sysdate,'SSSSS') from dual;
```
29. 本周星期几(n)的日期
```
select trunc(sysdate,'day') + n from dual;
```
30. 本月的天数
```
select to_char(last_day(sysdate),'dd') days from dual;
```
31. 计算当前月所有星期五的日期
```
select to_char(dt,'yyyy-mm-dd') 
  from(select trunc(sysdate,'mm')+rownum-1 dt
         from dual connect by rownum<=31
       )t
 where to_char(t.dt,'mm') = to_char(sysdate,'mm')
   and to_char(t.dt,'day')= '星期五';

--计算当前月所有星期五的日期(以","隔开)
select wm_concat(to_char(dt,'yyyy-mm-dd')) 
  from(select trunc(sysdate,'mm')+rownum-1 dt from dual connect by rownum<=31)t
 where to_char(t.dt,'mm') = to_char(sysdate,'mm')
   and to_char(t.dt,'day')= '星期五';
      
--计算当前月之前3个月的所有星期五的日期   
select to_char(dt,'yyyy-mm-dd') 
  from(select trunc(sysdate,'mm')+rownum-1 dt from dual connect by rownum<= (select add_months(sysdate,3)-trunc(sysdate)))t
 where to_char(t.dt,'day')= '星期五';
```