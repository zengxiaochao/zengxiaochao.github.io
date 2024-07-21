```sql
-- 当前连接数
show status like '%connect%';
-- 连接状态
show variables like '%connect%'
-- 当前连接列表
show processlist;
-- HOST记录查询
use performance_schema;
select * from host_cache;
```