## 1、```tar -zxvf nginx-1.15.2.tar.gz```
![](../img/2022-05-05-10-27-20.png)
## 2、``` cd nginx-1.15.2 ```
![](../img/2022-05-05-10-28-57.png)
## 3、``` yum -y install pcre-devel ```
![](../img/2022-05-05-10-29-53.png)
## 4、``` yum -y install openssl openssl-devel ```
![](../img/2022-05-05-10-30-10.png)
## 5、``` ./configure --prefix=/usr/local/nginx --add-module=/root/fastdfs/fastdfs-nginx-module-1.20/src ```(里面路径根据实际来)
![](../img/2022-05-05-10-30-58.png)
![](../img/2022-05-05-10-31-11.png)
## 6、``` make ```
![](../img/2022-05-05-10-32-22.png)
![](../img/2022-05-05-10-32-36.png)
## 7、``` make install ```
![](../img/2022-05-05-10-33-32.png)
## 8、``` /usr/local/nginx/sbin/nginx -V ```
![](../img/2022-05-05-10-34-27.png)
![](../img/2022-06-21-16-19-21.png)
![](../img/2022-06-21-16-19-43.png)