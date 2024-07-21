<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2022-12-14 09:34:39
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-06-13 10:39:50
 * @FilePath: \VsCodeWork\md\Oracle技巧.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
- 清空表数据

```sql
truncate table T_SYS_USER
```

- 新建数据库/登录用户

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
- 导入dmp文件
```
imp amc/amc file=D:\XXXX\XXXX\XXXXXX.DMP full=y ignore=y
```
