## Centos7安装JDK1.5
1. 下载安装包

[jdk-1_5_0_22-linux-i586-rpm.bin](https://www.oracle.com/java/technologies/java-archive-javase5-downloads.html)


2. 加权限并执行安装
```
chmod -R 777 jdk-1_5_0_22-linux-i586-rpm.bin
./jdk-1_5_0_22-linux-i586-rpm.bin
```

如果如果提示`lib/ld-linux.so.2: bad ELF interpreter: 没有那个文件或目录`运行
```
yum install glibc.i686
```

3. 寻找java安装路径
```
find / -name java
```

4. 配置环境变量
```
vim /etc/profile
```
内容如下
```
JAVA_HOME=/usr/java/jdk1.5.0_22
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH
```
刷新配置文件
```
source /etc/profile
```

5. 检查安装情况
```
java -version
```