- 清空表数据

```sql
truncate table T_SYS_USER
```

- 新建数据库

```sql
-- 创建登录用户
create user US_WEBPRO identified by "123456"   

--查询当前用户所属表空间
select username,default_tablespace from dba_users where username='US_WEBPRO';  

--创建新表空间
create tablespace TSP_WEBPRO datafile '/xx/app/oracle/product/11.2.0/xx/dbs/TSP_WEBPRO.dbf'size 30720M;  

--更换新用户表空间
Alter user US_WEBPRO default tablespace TSP_WEBPRO;    

--查询当前用户所属表空间
select username,default_tablespace from dba_users where username='US_WEBPRO';   

--用户赋权如下
grant create session,create table,create view,create trigger,create sequence,unlimited tablespace to US_WEBPRO;  
-- 或直接赋权超级权限角色  
grant dba to US_WEBPRO;  
  
--查询当前表空间内表信息
select table_Name, tablespace_Name from dba_tables where tablespace_name = 'TSP_WEBPRO';  
```
