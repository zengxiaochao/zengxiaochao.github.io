## 配置IP
1. 查看网卡（首先你的机器要有连接网线，用网线连接路由器和服务器，虚拟机则不用进行特殊处理）
```
ip addr
```
2. 修改网络配置文件
```
# 最后那个文件名为上边查到的那个
vi /etc/sysconfig/network-scripts/ifcfg-enp33
```
- DHCP自动分配IP修改文件：
```
BOOTPROTO=dhcp
ONBOOT=yes
```
- 或使用静态IP修改文件：
```
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.1.100 　　#静态IP  
GATEWAY=192.168.1.1 　　#默认网关  
NETMASK=255.255.255.0　　 #子网掩码  
DNS1=192.168.1.1　　 #DNS 配置
```
完整配置
```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
IPADDR=172.16.10.200
NETMASK=255.255.255.0
GATEWAY=172.16.10.1
DNS1=119.29.29.29
DNS2=180.76.76.76
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=2c2371f1-ef29-4514-a568-c4904bd11c82
DEVICE=ens33
ONBOOT=true
```
3. 重启网络服务
```
service network restart
```
4. DHCP状态下查看网关地址：
```
ip route show
```

## 安装相关组件
1. 查找相关组件
```
yum search ifconfig
```
2. 安装
```
yum install net-tools.x86_64
```
3. 测试
```
ifconfig
```




