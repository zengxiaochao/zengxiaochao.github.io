1. 找到配置文件位置
```
cd  /etc/sysconfig/network-scripts/
```
2. 修改配置文件
```
vi ifcfg-ens33
```
3. 将`BOOTPROTO`的值改为`static`，并设置静态IP等信息
```
BOOTPROTO=static
IPADDR=192.168.0.101 #静态IP  
GATEWAY=192.168.0.1 #默认网关  
NETMASK=255.255.255.0 #子网掩码  
DNS1=192.168.0.1 #DNS 配置  
```
4. 保存退出并重启网络
```
service network restart
```