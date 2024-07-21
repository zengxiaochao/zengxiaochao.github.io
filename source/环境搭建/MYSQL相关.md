## 一、Linux下安装部署MySQL
### 一、下载并安装MySQL服务
1. 下载

```
wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm
```

2. 安装

```
yum -y install mysql57-community-release-el7-10.noarch.rpm
```

3. 安装服务

```
yum -y install mysql-community-server
```


### 二、数据库服务配置
1. 服务相关命令

```
# 启动服务
systemctl start mysqld.service
# 停止服务
systemctl stop mysqld.service
# 查看服务运行状态
systemctl status mysqld.service
```

2. 查看服务初始化密码 

```
grep "password" /var/log/mysqld.log
```

3. 使用上边查找到的密码登录数据库

```
mysql -u root -p
```

4. 修改密码

```
ALTER USER 'root'@'%' IDENTIFIED BY 'new password';
```
或者
```
use mysql;
ALTER USER USER() IDENTIFIED BY 'new password';
update user set host = '%' where user = 'root';
```
如果出现密码强度校验
```
set global validate_password_policy=LOW;
set global validate_password_length=9;
```
5. 刷新重启数据库服务

```
flush privileges;
systemctl restart mysqld
```


### 三、开放防火墙端口（如果你的机器是云服务器，需要在服务商控制台安全组开放3306端口）  
1. 若你的机器连接不上这台服务器，查看一下防火墙状态，直接关掉防火墙也行，开放3306端口也行

```
# 查看防火墙状态
firewall-cmd --state
# 关闭防火墙
systemctl stop firewalld.service
# 重启防火墙
firewall-cmd --reload
# 禁止防火墙开机启动
systemctl disable firewalld.service 
# 开放指定端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
# 关闭指定端口
firewall-cmd --zone=public --remove-port=3306/tcp --permanent
```

# 二、Windows下安装部署MySQL