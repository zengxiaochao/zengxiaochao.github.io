1. 查看当前所有tcp端口
```
netstat -ntlp
```
2. 查看所有3306端口使用情况
```
netstat -ntulp | grep 3306
```