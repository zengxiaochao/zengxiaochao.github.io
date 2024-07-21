\1. 查看防火状态
```
systemctl status firewalld
```
2. 禁用防火墙
```
systemctl stop firewalld
```
3. 设置开机启动
```
systemctl enable firewalld
```
4. 停止并禁用开机启动
```
sytemctl disable firewalld
```
5. 重启防火墙
```
firewall-cmd --reload
```
6. 在指定区域打开端口（配置需要重启防火墙）
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
```
> –zone #作用域  
> –add-port=8080/tcp #添加端口，格式为：端口/通讯协议  
> –permanent #永久生效，没有此参数重启后失效  
7. 查看指定区域所有打开的端口
```
firewall-cmd --zone=public --list-ports
```


