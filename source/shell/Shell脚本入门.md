> shell 本质是一个文件，文件里面存放的是特定格式的指令，系统可以使用脚本解析器翻译或解析指令并执行（它不需要编译）

### 一. 使用 shell 输出 helloworld

1. 创建并编辑脚本文件

```
touch debug.sh
vim debug.sh
```

文件内容如下

```
#!/bin/bash
echo "helloworld"
```

2. 执行脚本

```
sh debug.sh
```

或者加权使用可执行权限执行

```
chmod +x debug.sh
./debug.sh
```

### 二. 连续指令执行

1. 创建并编辑脚本文件,文件内容如下

```
#!/bin/bash
cd /root/shellDebug
touch output.txt
echo "my name is LiHua" >>output.txt
```

2. 执行脚本方法如上

### 三. 常用 shell 脚本语法

1. 控制台输入

```
read -p "请输入一个数字:" num
```

1. for 循环

```
for ((i=0;i<=$num;i++))
do
     echo "i=$i"
done
```
