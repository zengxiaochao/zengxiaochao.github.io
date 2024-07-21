## SQL去重

### 1. 使用`Distinct`去重
```sql
select name,tel from userinfo;
select distinct name,tel from userinfo;
```
这样会出现多个字段同时去重的情况，比如上述情况，无法获取当用户表中的去重用户名，当用户名重复并电话号码重复时，`Distinct`才会判定为重复数据。
### 2. 使用`Group By`去重
```sql
select name,tel from userinfo;
select name,tel from userinfo group by name,tel;
select name,count(1) from userinfo group by name;
```
`Group By`会以某个数据分组展示，重复数据会合并，但是不能在合并数据中查询其他会产生冲突的数据，只能使用`count`或`sum`等集合方法处理其他字段
