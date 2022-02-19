# Linux下组件自启动相关步骤

> 注意：如果出现组件未成功启动的情况，使用`cat /var/log/messages|grep rc.local`查看相关日志

1、编辑系统自启动脚本
```
vim /etc/rc.d/rc.local
```  
2、添加相关组件启动命令以及所需的环境变量（如JAVA_HOME）
```
export JAVA_HOME=/usr/local/java/jdk1.8.0_241  #必须得加上这个才行

#Redis
./opt/redis-3.2.9/src/redis-server /opt/redis-3.2.9/redis.conf

#MyCat
/opt/mycat/bin/mycat start

# Tomcat
/usr/local/tomcat/bin/startup.sh

# MySQL
systemctl start mysqld.service
```
3、将rc.local修改为可执行
```
chmod 777 /etc/rc.d/rc.local
```
4、重启系统测试
`reboot`