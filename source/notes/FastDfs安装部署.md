## 一、FastDFS环境（基础服务）搭建部署

### 1、下载依赖包
1. 获取libfastcommon安装包，并解压编译安装
```
wget https://github.com/happyfish100/libfastcommon/archive/V1.0.38.tar.gz
tar -zxvf V1.0.38.tar.gz
cd libfastcommon-1.0.38
./make.sh
./make.sh install
```
> 常见问题: make: command not found/gcc: command not found  
> debian通过`apt-get install gcc make`安装  
> centos通过`yum -y install gcc make`安装  

### 2、下载安装FastDFS
1. 下载解压并编译安装
```
wget https://github.com/happyfish100/fastdfs/archive/V5.11.tar.gz
tar -zxvf V5.11.tar.gz
cd fastdfs-5.11
./make.sh
./make.sh install
```
### 3、配置Tracker
1. 生成正式配置文件并编辑
```
cd /etc/fdfs
cp tracker.conf.sample tracker.conf
vim tracker.conf
```
2. 修改相应参数
```
base_path=/home/mm/fastdfs/tracker  #tracker存储data和log的跟路径，必须提前创建好
port=22122 #tracker默认22122
http.server_port=80 #http端口，需要和nginx相同
```
3. 启动Tracker
```
/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf start
```
4. 检测启动状态
```
cat /home/mm/fastdfs/tracker/logs/tracker.log  #查看日志
netstat -apn|grep fdfs #查看端口情况
```
### 4、配置Storage
1. 生成正式配置文件并编辑
```
cd /etc/fdfs
cp storage.conf.sample storage.conf
vim storage.conf
```
2. 修改相应参数
```
base_path=/home/mm/fastdfs/storage   #storage存储data和log的跟路径，必须提前创建好
port=23000  #storge默认23000，同一个组的storage端口号必须一致
group_name=group1  #默认组名，根据实际情况修改
store_path_count=1  #存储路径个数，需要和store_path个数匹配
store_path0=/home/mm/fastdfs/storage  #如果为空，则使用base_path
tracker_server=10.122.149.211:22122 #配置该storage监听的tracker的ip和port
```
3. 启动Storage
```
/usr/bin/fdfs_storaged /etc/fdfs/storage.conf start
```
4. 检测启动状态
```
cat /home/mm/fastdfs/storage/logs/storage.log  #查看日志
netstat -apn|grep fdfs #查看端口情况
/usr/bin/fdfs_monitor /etc/fdfs/storage.conf #通过monitor来查看storage是否成功绑定
```

## 二、Java文件上传下载工具类联调
### 1、类初始化
```
ClientGlobal.init(filePath);
TrackerGroup trackerGroup = ClientGlobal.g_tracker_group;
trackerClient = new TrackerClient(trackerGroup);
```
### 2、上传文件的byte数组，获取生成的文件标识`fileid`
```
//实例化工具类
TrackerServer trackerServer = trackerClient.getTrackerServer();
StorageServer storageServer = trackerClient.getStoreStorage(trackerServer);
StorageClient1 storageClient1 = new StorageClient1(trackerServer, storageServer);
//上传
//bytes：文件byte数组
//extName：文件扩展名，可为空
String fileid = storageClient1.upload_file1(bytes, extName, null);
```
### 3、通过`fileid`下载文件
```
//实例化工具类
TrackerServer trackerServer = trackerClient.getTrackerServer();
StorageServer storageServer = trackerClient.getStoreStorage(trackerServer);
StorageClient1 storageClient1 = new StorageClient1(trackerServer, storageServer);
//下载
//fileid上传得到的唯一标识
byte[] bytes = storageClient1.download_file1(fileid);
```

## 三、FastDFS环境（Nginx文件预览）搭建部署
### 1、下载Fastdfs-nginx-module模块
1. 下载并解压
```
wget https://github.com/happyfish100/fastdfs-nginx-module/archive/V1.20.tar.gz
tar -xvf V1.20.tar.gz
```
2. 修改配置路径
```
cd fastdfs-nginx-module-1.20/src
vim config
```
> 改掉下面两个变量
```
ngx_module_incs="/usr/include/fastdfs /usr/include/fastcommon/"
CORE_INCS="$CORE_INCS /usr/include/fastdfs /usr/include/fastcommon/"
```
3. 配置`mod-fastdfs.conf`，并拷贝到`/etc/fdfs`文件目录下，并修改
```
cd fastdfs-nginx-module-1.20/src
cp mod_fastdfs.conf /etc/fdfs
vim mod_fastdfs.conf
```
> 按照下面属性配置
```
base_path=/home/mm/fastdfs
tracker_server=10.122.149.211:22122 #tracker的地址
url_have_group_name=true #url是否包含group名称
storage_server_port=23000 #需要和storage配置的相同
store_path_count=1  #存储路径个数，需要和store_path个数匹配
store_path0=/home/mm/fastdfs/storage #文件存储的位置
```
4. 最后需要拷贝fastdfs解压目录中的http.conf和mime.types
```
cd /root/fastdfs/libfastcommon-1.0.38/fastdfs-5.11/conf/
cp mime.types http.conf /etc/fdfs/
```
### 2、Nginx下载编译安装
1. 下载并编译安装安装
```
wget http://nginx.org/download/nginx-1.15.2.tar.gz
tar -zxvf nginx-1.15.2.tar.gz
cd nginx-1.15.2
yum -y install pcre-devel
yum -y install openssl openssl-devel
./configure --prefix=/usr/local/nginx --add-module=/root/fastdfs/fastdfs-nginx-module-1.20/src  #选上边下载的那个模块位置
make
make install
```
2. 配置
修改配置文件
```
vim /usr/local/nginx/conf/nginx.conf
```
80端口监听下加入
```
location ~/group[0-9]/M00 {
    ngx_fastdfs_module;
}
```
3. 重启
```
/usr/local/nginx/sbin/nginx -s stop
/usr/local/nginx/sbin/nginx -s reload
```
4. 检测配置状态
```
/usr/local/nginx/sbin/nginx -V
```
