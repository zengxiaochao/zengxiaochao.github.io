# 光光14问

## 1、队列 队列场景 几个队列对比

应用场景：

1. 异步处理 提高响应速度  发送短信、发送邮件
2. 应用解耦 两系统之间加入消息中间件
3. 流量削峰 用于秒杀系统
4. 日志处理 Kafka（收集日志）->Logstash（日志解析）->Elasticsearch（数据存储服务）->Kibana（数据可视化组件）
5. 消息通讯

## 2、锁的问题 并发锁怎么设计 乐观锁和悲观锁的设计

redis并发锁：`redis->setnx(key, time);`，加上过期时间，避免死锁

秒杀系统设计：

1. 库存放入redis
2. 扣库存使用redis锁
3. 发货消息通过消息队列
4. 秒杀结束后同步数据库

- 悲观锁：数据被外界修改保持保守态度，将数据处于锁定状态
- 乐观锁：基于数据版本记录机制实现，MVCC

缓存雪崩：对缓存设置不同的过期时间、建立redis集群

缓存穿透：参数过滤和提醒并引导用户走我们的设置的键值、对不合法的参数进行空对象缓存并设置较短的过期时间

redis淘汰策略：无法写入、移除最少使用的key、随机移除key、移除设置了过期时间中最少使用的key、随机移除设置了过期时间中的key、移除设置了过期时间中最早的key

## 3、数据问题 数据的隔离级别 以及一些接地气的比喻 索引的一些基本基础 能说出索引原理更加

索引类型：主键索引、单列索引、唯一索引、多列索引、全文索引

索引原理：B+Tree（平衡树）

聚簇索引：主索引直接存储行数据，次索引指向主索引

非聚簇索引：主索引和次索引指向物理行，由索引到磁盘拿数据（回行）

事务特性：原子性、一致性、隔离性、持久性

隔离级别：

- 未提交读  会产生脏读
- 已提交读 rc 其它数据库默认隔离级别  读不加锁，写、修改、删除加锁
- 可重复读 rr mysql默认隔离级别  可能幻读  
- 可串行化

## 4、数据运维的问题 比如大表怎么拆分 读写分离的问题 主从问题（单主多从 多主多从）

一张表200w数据就比较慢了，慢查询优化

1. show processlist 查看语句
2. explain 查看 type
3. show profile 查看Sending data

- 垂直分库：DB(user、order、product) -> DB(user)+DB(order)+DB(product)
- 水平分库：DB(user)-> DB1(user)+DB2(user)+DB3(user)
- 垂直分表：user(id、name、desc) -> user(id、name)+user(user_id、desc)
- 水平分表：user -> user1+user2+user3

## 5、数据瓶颈问题 这里要牵扯出搜索引擎，比如目前es 或者一些 sphinx

es基础：

- `_index` 索引 相当于SQL中的`database`
- `_type` 类型 相当于SQL中的`table`
- `_id` 唯一标识 相当于SQL中的`id`

es同步：

- 定时任务同步数据，无法达到实时性
- logstash+Elasticsearch-jdbc实时mysql同步

## 6、日志问题 如果能直接说出 完整elk的解决方案 更好

日志处理 Kafka（收集日志）->Logstash（日志解析）->Elasticsearch（数据存储服务）->Kibana（数据可视化组件）

## 7、性能排查问题 一些性能处理 xhporf（现在问的少了） 异常监控 一些傻逼行为规避

## 8、设计模式 能撸一些基本设计模式 更好

## 9、算法 我也只会一些基础 这个我也欠缺

## 10、数据结构 我也只会一些基础 我也欠缺

## 11、一些异步场景 怎么同步切换异步

## 12、网络层面 直接能熟悉swoole更好 因为我有swoole的项目经验

```sh
# pid=22402为master进程
# pid=22403为manager进程，子进程有8个worker进程和12个task进程
UID        PID  PPID  C STIME TTY          TIME CMD
root     22402     1  0 10:49 ?        00:00:00 swoft-http master process (/data1/work/houduan_test/zy_familyapi_test/www/bin/swoft)
root     22403 22402  0 10:49 ?        00:00:00 swoft-http manager process
root     22420 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22421 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22422 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22423 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22424 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22425 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22438 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22440 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22450 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22462 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22469 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22471 22403  0 10:49 ?        00:00:00 swoft-http task process
root     22480 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22489 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22507 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22521 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22529 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22537 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22550 22403  0 10:49 ?        00:00:00 swoft-http worker process
root     22560 22403  0 10:49 ?        00:00:00 swoft-http worker process
```

## 13、微服务 docker k8s swarm 的一些经验更好 这个我只有微服务经验

## 14、服务器层面 nginx一些基本知识点 fpm知识点 一些服务器常用写法 比如sort 或者 xargs 一些基础
