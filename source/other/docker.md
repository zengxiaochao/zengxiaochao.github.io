# 配置Docker启动项目教程
**注意：以下操作均依赖于Docker环境，请确保正常安装部署Docker。**

## 一、打包生成镜像（两种方式皆可以）
### 方法一：使用IDEA制作镜像并直接生成容器
1.使用`Maven`的`install`将项目打包成`war`包，查看`target`下是否生成`war`文件  
2.运行`Dockerfile`并配置启动项，（若出现找不到`Dockerfile`异常，关闭IDEA重新使用管理员权限打开IDEA） 
![](2022-02-23-14-48-29.png)
![](2022-02-23-14-49-03.png)   
选择`Docker`运行的`Server`(可选本地或者远程机器上的Docker环境)  
![](2022-02-23-14-40-23.png)

3. 修改相关参数 
```
      Image tag: webprojectimage        #生成的镜像名  
 Container name: webprojectcontainer    #生成的容器名  
     Bind ports: 8080:8080              #主机映射到虚拟容器的端口  
```
![](2022-02-23-10-43-53.png)
4. 两分钟后重启webprojectcontainer容器，访问主机映射的端口

### 方法二：在有Docker的环境中使用Docker命令打包镜像
1. 打包项目生成war包，放置Dockerfile同级目录的target下
2. 打包生成名为projectimages镜像
```
docker build -t projectimages .
```
3. 使用projectimages镜像生成名为projectweb_secrecy_container的容器
```
docker run -d -p 8080:8080 --name projectweb_secrecy_container projectimages
```
4. 启动容器
```
docker start projectweb_secrecy_container
```

## 二、导出镜像
**将Docker中的名为`webprojectimage`的镜像导出为当前文件夹下的`webprojectimage.tar`压缩包**
```
docker save -o webprojectimage.tar webprojectimage
```

## 三、导入镜像
**将上一个步骤中得到的`webprojectimage.tar`镜像压缩包传输到任何部署好Docker服务的机器上，都可以加载进当前机器并启动**
1. 加载上边得到的镜像进Docker
```
docker load -i webprojectimage.tar
```
2. 使用`webprojectimage`镜像生成名为`webprojectimage_container`的容器
```
docker run -d -p 8080:8080 --name webprojectimage_container webprojectimage
```
3. 启动容器或重启
```
docker start webprojectimage_container
docker restart webprojectimage_container
```


