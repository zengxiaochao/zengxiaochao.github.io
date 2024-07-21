```
insert into loginfo(userName,tel) select userName,tel from userinfo where userId='1001';
```
```
select case userType 
when '1' then '游客'
when '2' then '普通用户'
when '3' then '管理员' end as userType,userName,userId from userinfo;
```
