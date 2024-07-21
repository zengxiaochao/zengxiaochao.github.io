<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2023-07-11 09:54:03
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-07-11 14:25:02
 * @FilePath: \VsCodeWork\md\202307\Redis配置主从集群.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## Redis部署单机及哨兵多节点
### 一.编译安装单机Redis
```
yum install wget
cd /root
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
tar xzf redis-5.0.7.tar.gz
cd redis-5.0.7/
yum install gcc
make MALLOC=libc
```
将启动需要的配置文件全部放在一块管理
```
cd /root/redis-5.0.7/
mkdir etc
mkdir bin
cp redis.conf /root/redis-5.0.7/etc
cd src/
cp mkreleasehdr.sh redis-benchmark redis-check-aof redis-check-rdb redis-cli redis-server redis-sentinel /root/redis-5.0.7/bin/
```
### 二.启动单机Redis
```
cd /root/redis-5.0.7/bin
./redis-server /root/redis-5.0.7/etc/redis.conf
```
### 三.主从配置
1. 主机配置`redis.conf`
```
bind 0.0.0.0
port 6379
protected-mode no
daemonize yes
logfile ./redis.log
requirepass 123456
masterauth 123456
```
2. 从机配置`redis.conf`
注意老版本不用`replicaof`而是用`slaveof`,且多个节点间port不要重复
```
bind 0.0.0.0
port 6380
protected-mode no
daemonize yes
logfile ./redis.log
requirepass 123456
masterauth 123456
replicaof 192.168.44.142 6379
```
使用启动单机Redis方法分别启动多个节点
### 四.哨兵配置
```
cd /root/redis-5.0.7
cp sentinel.conf /root/redis-5.0.7/etc/
cd etc/
vi sentinel.conf
```
配置一如下
```
port 26379
protected-mode no
daemonize yes
logfile ./sentinel.log
sentinel monitor mymaster 192.168.44.142 6379 1
sentinel auth-pass mymaster 123456
sentinel down-after-milliseconds mymaster 3000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000
```
配置二如下
```
port 26380
protected-mode no
daemonize yes
logfile ./sentinel.log
sentinel monitor mymaster 192.168.44.142 6379 1
sentinel auth-pass mymaster 123456
sentinel down-after-milliseconds mymaster 5000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000
```
启动哨兵
```
cd /root/redis-5.0.7/bin
./redis-sentinel /root/redis-5.0.7/etc/sentinel.conf
./redis-sentinel /root/redis-5.0.7/etc/sentinelSec.conf
```

###  五.状态查询
进入Redis命令行
```
cd /root/redis-5.0.7/bin
./redis-cli -p 6379
```
密码登录
```
auth 123456
```
查询节点状态
```
info replication
```