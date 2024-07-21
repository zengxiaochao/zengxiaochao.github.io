# MongoDB
原文链接：https://blog.csdn.net/li_wen_jin/article/details/133639954

docker pull mongo:latest
mkdir -p /opt/mongodata/config
mkdir -p /opt/mongodata/data
mkdir -p /opt/mongodata/logs
touch /opt/mongodata/config/mongod.conf
chmod 777 /opt/mongodata

vim /opt/mongodata/config/mongod.conf
```
# 数据库存储路径
dbpath=/opt/mongodata/data
 
# 日志文件路径
logpath=/opt/mongodata/logs/mongod.log

# 监听的端口
port=27017
 
# 允许所有的 IP 地址连接
bind_ip=0.0.0.0
 
# 启用日志记录
journal=true
 
# 是否后台运行
fork=true     
                   
# 启用身份验证
#auth=true
```

docker run -dit --name mongo \
-p 27017:27017 \
-v /opt/mongodata/config/mongod.conf:/etc/mongod.conf \
-v /opt/mongodata/data:/data/db \
-v /opt/mongodata/logs:/var/log/mongodb \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=123456 \
--restart=always  \
--privileged=true \
mongo

```
-i:表示运行容器
-t:表示容器启动后进入其命令行
-d:守护式方式创建容器在后台运行
-name:容器名称

 -p 27017:27017     端口映射    前面是外部访问端口：后面内部开发的端口，mongoDB默认是27017端口

 -v /mydata/mongo/data:/data/db  给容器内部的数据文件指向mongodbdata ，即删除了容器，容器数据也不会丢失，下次创建容器继续挂载到/mydata/mongo/data即可看到删除容器之前的数据
-e MONGO_INITDB_ROOT_USERNAME=admin

-e MONGO_INITDB_ROOT_PASSWORD=123456  指定容器内的环境变量 初始化容器账号、密码
--restart=always   容器挂掉后自动重启
```







# 登录数据库命令行

docker exec -it mongodb bash
mongo admin -u admin -p 123456
use admin

db.createUser(
	{
		user:"root",
		pwd:"123456",
		roles:[{role:"root",db:"admin"}]
	}
);
 
//尝试使用上面创建的用户信息进行连接。
db.auth('root', '123456');
//更新用户角色，修改用户权限，不会覆盖原权限信息，只新增权限：
db.updateUser("admin",{roles:[{role:"readWrite",db:"admin"}]})
//更新用户密码
db.changeUserPassword("admin","123456")
//删除用户
db.dropUser({'admin'})
//查看所有用户
show users
//查看数据库（非admin数据库的用户不能使用数据库命令）
show dbs


# 创建数据表
db.createCollection('resources');
show collections;
show dbs;


# 数据转储恢复
mongodump --host localhost:27017 --gzip --db whsysxt --out /var/log/mongodb
mongorestore --host localhost:27017 --gzip --db whsysxt /var/log/mongodb --username root --password 123456

