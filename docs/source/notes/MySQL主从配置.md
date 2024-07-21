# 一. 准备两台安装mysql的机器 
ip分别为:192.168.44.142和192.168.44.147
# 二. 修改配置(配置文件Linux下为`/etc/my.cnf`,windows下为`my.ini`)
主服务器添加配置:
```
#主服务器唯一Id[必填]
server-id=142
#启用二进制日志[必填]
log-bin=mysql-bin
#设置需要复制的数据库[可选],多个多行
#binlog-do-db=yhyun_sccxt_1
#binlog-do-db=yhyun_sccxt_2
#binlog-do-db=yhyun_sccxt_3
#binlog保留时间7天
#expire_logs_days=7
#主机，读写都可以
#read-only=0
#忽略同步的数据库
#replicate-ignore-db=mysql,information_schema,performance_schema
#设置logbin格式
#binlog-format=STATEMENT
#主键递增的步长，如果双主机，如果是自动递增的主键的话，会出现主键冲突的问题
#auto_increment_increment=2
#主键自动递增的初始值，双主的起始值设置的时候需要错开
#auto_increment_offset=1
#双主的实例从对方实例中同步过来的数据进行二进制日志文件记录，这样才能让从节点进行同步
#log-slave-updates=1
``` 
从服务器添加配置配置:
```
#从服务器唯一Id
server-id=147
#启用二进制日志[必填]
log-bin=mysql-bin
#只读，对拥有super权限的账号是不生效的
read_only = 1
``` 
# 三. 主从服务器都重启mysql服务
```
systemctl restart mysqld
```
# 四. 建立账户并授权
登录主服务器MYSQL(此处授权给了root用户):
```
GRANT REPLICATION SLAVE ON *.* TO root@'%';
flush privileges;
show master status; -- 获取下面的change master参数
```
登录从服务器MYSQL(创建链接时的参数使用上一步查询结果):
```
stop slave;
change master to master_host='192.168.44.142',master_port=3306,master_user='root',master_password='123456',master_log_file='mysql-bin.000001',master_log_pos=1021;
start slave;
show slave status;
```


# 五. 常见问题
1. 同步中断
![](img/2023-11-09-09-39-39.png)
**注意解决问题是需要停止主机的写入操作,问题出现的原因为操作回滚,可能由于从库写入引起**
```
show master status; -- 主机查询master_log_pos
stop slave;
change master to master_host='192.168.44.142',master_port=3306,master_user='root',master_password='123456',master_log_file='mysql-bin.000001',master_log_pos=1021;
start slave;
```

2. 无法建立链接,或无法同步数据:登录从服务器,移除auto.cnf文件并重启服务:
```
find / -name auto.cnf
```