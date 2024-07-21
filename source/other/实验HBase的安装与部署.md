## 实验HBase的安装与部署（分布式模式）

## 一、实验步骤

###     因为HBase集群依赖于Zookeeper集群

###    1、Zookeeper镜像文件下载地址：https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.6.1/apache-zookeeper-3.6.1-bin.tar.gz 

###    2、HBase 镜像文件下载地址：https://www.apache.org/dyn/closer.lua/hbase/2.2.4/hbase-2.2.4-bin.tar.gz

###          3、安装与部署

​       /data/program (为安装包目录)

```bash
# 下载安装包
wget https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.6.1/apache-zookeeper-3.6.1-bin.tar.gz
# 解压前先验证包是否完整
sha256sum apache-zookeeper-3.6.1-bin.tar.gz
```

预计输出：

> 5066dd085cee2a7435a1bb25677102f0d4ea585f314bd026799f333b0956a06d  apache-zookeeper-3.6.1-bin.tar.gz

1、zookeep的安装

```shell
# 1. 请解压apache-zookeeper-3.6.1-bin.tar.gz到 /data/program/目录下
tar -xzvf apache-zookeeper-3.6.1-bin.tar.gz

# 2.在/data/program/目录下创建软链接zookeeper到/data/program/apache-zookeeper-3.6.1-bin
ln -s /data/program/apache-zookeeper-3.6.1-bin zookeeper

# 3.环境配置
  1. 在/etc/profile.d/下创建一个zookeeper.sh，并再文件内填以下代码
     export ZOOKEEPER_HOME=/data/program/zookeeper
     PATH=$PATH:$ZOOKEEPER_HOME/bin
  2. 运行 source /etc/profile 让环境变量生效
  3. 在/data/bin/下创建zk-start.sh和zk-stop.sh用于方便启动，并再文件内填以下代码
  zk-start.sh代码：$ZOOKEEPER_HOME/bin/zkServer.sh start
  zk-stop.sh代码：$ZOOKEEPER_HOME/bin/zkServer.sh stop
  
# 4.创建日志目录zookeeper到data/logs 目录底下 为后续相关内容做准备 
mkdir -p /data/logs/zookeeper

# 5.创建保存数据的目录zkdata到/data/datalake 目录底下 为后续相关内容做准备
mkdir -p /data/datalake/zkdata

# 6.进入cd zookeeper配置相关文件

 #1、进入cd conf目录 找到zoo_sample.cfg 因为zookeeper默认是找zoo.cfg文件，
 #   所以我们备份一份重命名为zoo.cfg
 #   zoo_sample.cfg(样例配置文件)
   cp zoo_sample.cfg zoo.cfg
 #2、修改zoo.cfg文件内 dataDir指向我们刚刚创建的zkdata目录
    /data/datalake/zkdata
    
    #末尾添加 
     dataLogDir=/data/logs/zookeeper/     #日志路径
     server.1=master:32008:42008      #对应主机
     server.2=slave1:32008:42008
#3、进入cd /data/logs/zookeeper 目录下创建 myid 用于区分主机与备用机
      vi myid
      master里的内容写1   slave1写2
#4、进入cd /data/program/zookeeper/bin 里启动
    ./zkServer.sh start
```

2、hbase的安装与部署

```bash
# 下载安装包
wget https://www.apache.org/dyn/closer.lua/hbase/2.2.4/hbase-2.2.4-bin.tar.gz
# 解压前先验证包是否完整
sha256sum hbase-2.2.4-bin.tar.gz
```

预计输出：

> ec91b628352931e22a091a206be93061b6bf5364044a28fb9e82f0023aca3ca4  hbase-2.2.4-bin.tar.gz

```shell
# 1. 请解压hbase-2.2.4-bin.tar.gz到 /data/program/目录下
tar -xzvf hbase-2.2.4-bin.tar.gz

# 2.在/data/program/目录下创建软链接hbase到/data/program/hbase-2.2.5-client
ln -s /data/program/hbase-2.2.4 hbase

# 3.环境配置
  1. 在/etc/profile.d/下创建一个hbase.sh，并再文件内填以下代码
     export HBASE_HOME=/data/program/hbase
     PATH=$PATH:$HBASE_HOME/bin
  2. 运行 source /etc/profile 让环境变量生效
  3. 在/data/bin/下创建hbase-start.sh和hbase-stop.sh用于方便启动，并再文件内填以下代码
  hbase-start.sh代码：$HBASE_HOME/bin/start-hbase.sh
  hbase-stop.sh代码：$HBASE_HOME/bin/stop-hbase.sh

# 3. 配置 hbase/conf/ 目录下的 hbase-site.xml文件
  1、vi hbase-site.xml
  2、在<configuration>内配置以下内容
    <property> 
    <name>hbase.rootdir</name> 
    <value>hdfs://master:9000/hbase/hbase_db</value>
    </property>
    <property>
    <name>hbase.unsafe.stream.capability.enforce</name>
    <value>false</value>
    </property>
    <property>
    <name>hbase.cluster.distributed</name>        #是否是分布式
    <value>true</value>
    </property>
    <property>
    <name>hbase.zookeeper.quorum</name>
    <value>master,slave1</value>                       #对应主机名
    </property>
    <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/data/datalake/zkdata</value>
    </property>
    <property>
    <name>hbase.master.info.port</name>
    <value>10086</value>
    </property>
#4.修改 regionservers 两台里的对应主机名称
    master           slave1
#5.在hbase-env.sh 里 添加 对应的端口号
  export HBASE_SSH_OPTS="-p 52002"
#6.启动环境 cd /data/bin
    主机把hdfs 和yarn 启动起来就行 备用机不用
    
    两个启动好之后 启动hbase cd /data/program/hbase/bin
    ./start-hbase.sh  # 启动失败的话，尝试下一行的代码
    ./start-hbase.sh status
    
    启动好之后，可以打开http://master:10086查看Hbase的Web UI
#7.启动代码窗口
   ./hbase shell
   
#8. hbase主要作用增删查
  1.查看表  list
  2.创建表 create '表名','列族1','列族2','列族N'
  create 'Student','StuInfo','Grades'
  3.添加数据(每次只能添加一个值) put '表名','行键','列族:列名','单元格的值','时间戳'
put 'Student','0001','StuInfo:Name','Tom Green'
put 'Student','0001','StuInfo:Age','18'
put 'Student','0001','StuInfo:Sex','Male'
put 'Student','0001','Grades:BigData','80'
put 'Student','0001','Grades:Computer','90'
put 'Student','0001','Grades:Math','85'
put 'Student','0002','StuInfo:Name','Amy'
put 'Student','0002','StuInfo:Age','19'
put 'Student','0002','StuInfo:Class','01'
put 'Student','0002','Grades:BigData','95'
put 'Student','0002','Grades:Math','89'
  4.查找 get '表名','行键'
  get 'Student','0001'
  5.表的扫描 scan '表名'
  scan 'Student'
  6.删除行 deleteall '表名','行键'
  要删除表必须先让这个表失效
  令该表失效  disable '表名'
  删除表  drop '表名'
  disable 'Student'
  drop 'Student'
  
  7.退出：exit
  
```

![图1](.\image\案例表.png)

### HBase Shell相关命令

|  **hbase**  |        **shell命令**         |                   **描述**                    |
| :---------: | :--------------------------: | :-------------------------------------------: |
|    list     |          查看所有表          |                   list all                    |
|   create    |            创建表            | create ‘表名’, ‘列族名1’, ‘列族名2’,‘列族名N’ |
|  describe   |        显示表详细信息        |                describe ‘表名’                |
|   exists    |        判断表是否存在        |                 exists ‘表名’                 |
|   enable    |           使表有效           |                 enable ‘表名’                 |
|   disable   |           使表无效           |                disable ‘表名’                 |
| is_enabled  |        判断是否启动表        |               is_enabled ‘表名’               |
| is_disabled |        判断是否禁用表        |              is_disabled ‘表名’               |
|    count    |       统计表中行的数量       |                 count ‘表名’                  |
|     put     |           添加记录           |   put ‘表名’, ‘row key’, ‘列族1 : 列’, ‘值’   |
|     get     |   获取记录(row key下所有)    |             get ‘表名’, ‘row key’             |
|     get     |      获取记录(某个列族)      |         get ‘表名’, ‘row key’, ‘列族’         |
|     get     |       获取记录(某个列)       |        get ‘表名’,‘row key’,‘列族:列’         |
|   delete    |           删除记录           |      delete ‘表名’, ‘row key’, ‘列族:列’      |
|  deleteall  |           删除一行           |          deleteall ‘表名’,‘row key’           |
|    drop     |            删除表            |       先disable ‘表名’   后drop ‘表名’        |
|    alter    |  修改列族（column family）   |                                               |
|    incr     |    增加指定表，行或列的值    |                                               |
|  truncate   |            清空表            |      逻辑为先删除后创建  truncate ‘表明’      |
|    scan     | 通过对表的扫描来获取对用的值 |                  scan ‘表名’                  |
|    tools    |    列出hbase所支持的工具     |                                               |
|   status    |   返回hbase集群的状态信息    |                                               |
|   version   |      返回hbase版本信息       |                                               |
|    exit     |       退出hbase shell        |                                               |
|  shutdown   |  关闭hbase集群(与exit不同)   |                                               |

