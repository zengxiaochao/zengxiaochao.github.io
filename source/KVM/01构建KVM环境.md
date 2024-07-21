# 构建KVM环境

## 1.开启CPU虚拟化

在x86-64架构的处理器中，KVM需要的硬件虚拟化扩展分别为Intel的虚拟化技术
（Intel VT）和AMD的AMD-V技术。其中，Intel在2005年11月发布的奔腾四处理器（型
号：662和672）中第一次正式支持VT技术（Virtualization Technology），之后不久的2006
年5月AMD也发布了支持AMD-V的处理器。现在比较流行的针对服务器和桌面的Intel处
理器多数都是支持VT技术的。

设置好了VT和VT-d的相关选项，保存BIOS的设置并退出，系统重启后生效。在
Linux系统中，可以通过检查/proc/cpuinfo文件中的CPU特性标志（flags）来查看CPU目前是否支持硬件虚拟化。

```shell
[root@bogon ~]# grep -E "svm|vmx" /proc/cpuinfo
flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon
 pebs bts nopl xtopology tsc_reliable nonstop_tsc aperfmperf eagerfpu pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch epb tpr_shadow vnmi ept vpid fsgsbase tsc_adjust bmi1 avx2 smep bmi2 invpcid rdseed adx smap xsaveopt dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_eppflags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon
 pebs bts nopl xtopology tsc_reliable nonstop_tsc aperfmperf eagerfpu pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch epb tpr_shadow vnmi ept vpid fsgsbase tsc_adjust bmi1 avx2 smep bmi2 invpcid rdseed adx smap xsaveopt dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp
```

## 2.安装宿主机Linux系统

操作系统的安装在此省略....

系统安装过程中我们需要选上“Development Tools”，因为在本书的KVM编译过程中以及其他实验中可能会用到，其中包括一些比较重要的软件包，比如：gcc、git、make等（一般被默认选中）。可以看到还有“Virtualization Hypervisor”“Virtualization Tools”。

```shell
yum install tree telnet dos2unix sysstat lrzsz vim git net-tools wget nc nmap -y 

wget -O /etc/yum.repos.d/CentOS7-Base-163.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo 

sudo yum install -y epel-release

# Development Tools
yum -y groupinfo Development tools
```



## 3.编译和安装KVM

### 3.1 下载KVM源代码

总的来说，下载最新KVM源代码，主要有以下3种方式：
1）下载KVM项目开发中的代码仓库kvm.git。

2）下载Linux内核的代码仓库linux.git。

3）打包下载Linux内核的源代码（Tarball格式）



```
Clone
git://git.kernel.org/pub/scm/virt/kvm/kvm.git
https://git.kernel.org/pub/scm/virt/kvm/kvm.git
https://kernel.googlesource.com/pub/scm/virt/kvm/kvm.git
```



kvm.git的下载方式和过程为以下命令行所示

```shell
[root@bogon ~]# git clone git://git.kernel.org/pub/scm/virt/kvm/kvm.git
正克隆到 'kvm'...
remote: Enumerating objects: 7660907, done.
接收对象中:   0% (280/7660907), 220.00 KiB | 9.00 KiB/s  
```

编译安装的方式安装比较慢，在此不继续深入安装了，一般使用yum的方式。



### 3.2 Yum安装KVM

```shell
[root@bogon ~]# cat /etc/redhat-release 
CentOS Linux release 7.6.1810 (Core) 
[root@bogon ~]# uname -r
3.10.0-957.el7.x86_64
[root@bogon ~]# sestatus 
SELinux status:                 disabled
[root@bogon ~]# systemctl stop firewalld.service
[root@bogon ~]# hostname -I
192.168.7.9 
# kvm主机内存不能低于4GB
```

**安装KVM虚拟化软件**

安装依赖包(可以使用本地yum源)

```shell
yum install libvirt* virt-* qemu-kvm* -y
```

安装软件说明内容：

```
libvirt    # 虚拟机管理
virt       # 虚拟机安装克隆
qemu-kvm   # 管理虚拟机磁盘
```

启动服务

```shell
# systemctl start libvirtd.service
# systemctl status libvirtd.service
```

#### 3.2.1 Yum安装KVM案例二

参考文献：

http://blog.linuxli.com/2019/05/Hypervisor_kvm/

### 3.3 编译和安装QEMU

除了在内核空间的KVM模块之外，在用户空间需要QEMU [1] 来模拟所需要的CPU和设备模型，以及启动客户机进程，这样才有了一个完整的KVM运行环境。

QEMU开发代码仓库的网页连接为：http://git.qemu.org/qemu.git。

其中，可以看到有如下2个URL链接可供下载开发中的最新qemu-kvm的代码仓库。

```
git://git.qemu.org/qemu.git
http://git.qemu.org/git/qemu.git
```

  可以根据自己实际需要选择当中任一个，用git clone命令下载即可，它们是完全一样的。
另外，也可以到以下下载链接中根据需要下载最近几个发布版本的代码压缩包。

```
http://wiki.qemu.org/Download
```

下载qemu.git，获取代码仓库

```
[root@bogon ~]# git clone git://git.qemu.org/qemu.git
正克隆到 'qemu'...
remote: Counting objects: 508702, done.
```

**各x86平台上qemu的安装**

QEMU is packaged by most Linux distributions:

```shell
Arch: pacman -S qemu

Debian/Ubuntu: apt-get install qemu

Fedora: dnf install @virtualization

Gentoo: emerge --ask app-emulation/qemu

RHEL/CentOS: yum install qemu-kvm

SUSE: zypper install qemu
```

##### 3.3.1 源码安装

```shell
yum -y install glib*
wget -c https://download.qemu.org/qemu-5.1.0.tar.xz
tar xvJf qemu-5.1.0.tar.xz
cd qemu-5.1.0/ && ./configure 
make && make install
```

参考文献

<https://www.qemu.org/download/#source>

##### 3.3.2 使用Git包编译安装

Git安装方式不推荐，除非参与开发

配置和编译QEMU

指定`--target-list=x86_64-softmmu`，可以节省大量的编译时间。

执行configure文件进行配置的过程如下：

```shell
[root@bogon qemu]#./configure --target-list=x86_64-softmmu
Using './build' as the directory for build output
remote: Enumerating objects: 76, done.
remote: Counting objects: 100% (76/76), done.
remote: Compressing objects: 100% (72/72), done.
```

> 前提：是Python版本>=3.5

**升级python版本的脚本如下**

```shell
#!/usr/bin/env bash
#usage:xxx
#scripts_name:${NAME}.sh
# author：xiaojian


function install_python3() {
    yum install gcc-c++ gcc make cmake zlib-devel bzip2-devel openssl-devel ncurse-devel libffi-devel -y
    wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz && tar xvJf Python-3.7.0.tar.xz && cd Python-3.7.0 || exit -1
    ./configure --with-ssl
    if test "$?" -eq 0; then
        make && make install
    fi
    if [ "$?" -eq 0 ]; then
        echo "Python3 install successful....."
    fi
}

function install_pip3() {
    cp /etc/yum.repos.d/CentOS-Base.repo{,_bak}
    wget -O /etc/yum.repos.d/CentOS7-Aliyun.repo http://mirrors.aliyun.com/repo/Centos-7.repo
	wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
    yum -y install python3-pip
}


function Set_soft_Link_And_Config() {
    # 删除软链接，建立新的软连接
    rm -rf /usr/bin/pip3
    rm -rf /usr/bin/python3
    cp -rf /usr/bin/python{,_2.7_bak}
    ln -s /usr/local/bin/python3.7 /usr/bin/python
    ln -s /usr/local/bin/pip3.7 /usr/bin/pip3

   sed -i 's#\/usr/bin/python#\/usr/bin/python2.7#g' /usr/bin/yum
   sed -i 's#\/usr/bin/python#\/usr/bin/python2.7#g'  /usr/libexec/urlgrabber-ext-down
    sed -i 's#\/usr/bin/python#\/usr/bin/python2.7#g' /usr/sbin/firewalld
    sed -i 's#\/usr/bin/python#\/usr/bin/python2.7#g' /usr/bin/firewall-cmd
    :
}


function main() {
    install_python3
    install_pip3
    Set_soft_Link_And_Config
}
main
```

> ‘ERROR: pixman >= 0.21.8 not present.’ 解决方案

```shell
[root@bogon qemu]# yum -y install pixman.i686 pixman.x86_64 pixman-devel.i686 pixman-devel.x86_64
```

后续要重新configure时，只要执行“./config.status”就可以恢复上一次configure的配置。

直接执行make

```shell
[root@bogon qemu]# make && make install
changing dir to build for make ""...
make[1]: 进入目录“/root/qemu/build”
```

最后，编译生成x86_64-softmmu/qemu-system-x86_64文件，就是我们需要的用户空间用于其KVM客户机的工具了（在多数Linux发行版中自带的qemu-kvm软件包的命令行是qemu-kvm，只是名字不同的downstream，用户可以等同视之）。

QEMU安装过程的**主要任务**有这几个：

- 创建QEMU的一些目录，复制一些**配置文件**到相应的目录下，复制一些**firmware文件**（如：**sgabios.bin**、**kvmvapic.bin**）到目录下，以便**qemu命令行启动**时可以找到**对应的固件！！！** 供**客户机使用**；
- 复制**keymaps**到相应的目录下，以便在**客户机中**支持各种所需**键盘类型！！！**；
- 复制**qemu-system-x86_64**、**qemu-img**等可执行程序到对应的目录下。

### 3.4 安装客户机

现在开始快速地演示安装一个客户机，采用了本地创建一个镜像文件，然
后将镜像文件作为客户机的硬盘，将客户机操作系统（以centos7为例）安装在其中。

安装客户机（Guest）之前，我们需要创建一个镜像文件或者磁盘分区等，来存储客户机中的系统和文件。

```shell
[root@bogon ~]# qemu-img create -f raw centos7.img 40G
Formatting 'centos7.img', fmt=raw size=42949672960 
```

上述就是用`qemu-img create`命令创建了一个空白的guest image，以raw格式，image文件的名字是“centos7.img”，大小是40G。虽然我们看到它的大小是40G，但是它并不占用任何磁盘空间。

```shell
[root@bogon ~]# ls -lh centos7.img
-rw-r--r-- 1 root root 40G 8月  25 15:46 centos7.img
[root@bogon ~]# du centos7.img
0	centos7.img
```

这是因为qemu-img聪明地为你按实际需求分配文件的实际大小，它将随着image实际的使用而增大。(qemu-img默认的方式是按需分配的),下面演示qemu-img支持设置参数让你可以一开始就实际占有20G

```shell
[root@bogon ~]# qemu-img create -f raw -o preallocation=full centos7.img 20G

[root@bogon ~]# ls -lh centos7.img
-rw-r--r-- 1 root root 20G 8月  25 15:51 rhel7.img

[root@bogon ~]# du -sh centos7.img
20G	rhel7.img
```

除raw格式以外，qemu-img还支持创建其他格式的image文件，比如qcow2，甚至是其他虚拟机用到的文件格式，比如VMware的vmdk、vdi、vhd等。不同的文件格式会有不同的“-o”选项。

查看镜像的信息

```shell
[root@desktop-pmjtngi ~]# qemu-img info centos7.img 
image: centos7.img
file format: raw
virtual size: 40 GiB (42949672960 bytes)
disk size: 0 B
```

创建完空白guest image之后，我们将`CentOS-7-x86_64-Minimal-1810.iso`安装所需的ISO文件准备好。

```shell
[root@bogon ~]# ls -l CentOS-7-x86_64-Minimal-1810.iso 
-rw-r--r-- 1 root root 962592768 8月  25 15:58 CentOS-7-x86_64-Minimal-1810.iso
```

启动客户机，并在其中用准备好的ISO安装系统，命令行如下：

```shell
[root@desktop-pmjtngi ~]# qemu-system-x86_64 -enable-kvm -m 2G -smp 2 -boot once=d -cdrom CentOS-7-x86_64-Minimal-1810.iso centos7.img
WARNING: Image format was not specified for 'centos7.img' and probing guessed raw.
         Automatically detecting the format is dangerous for raw images, write operations on block 0 will be restricted.
         Specify the 'raw' format explicitly to remove the restrictions.
VNC server running on ::1:5900
```

其中

```
-m 1G是给客户机分配1G内存，
-smp 1是指定客户机为对称多处理器结构并分配个1CPU，
-boot once=d是指定系统的启动顺序为首次光驱，以后再使用默认启动项（硬盘） 
-cdrom**是分配客户机的光驱。默认情况下，QEMU会启动一个VNC server端口
（5900），可以用vncviwer工具 来连接到QEMU的VNC端口查看客户机。
```



安装vncviwer工具

```shell
yum -y install tigervnc-server tigervnc
```

通过启动时的提示，这里可以使用“vncviewer：5900”命令连接到QEMU启动的窗口。根据命令行指定的启动顺序，当有CDROM时，客户机默认会从光驱引导，启动后即可进入客户机系统安装界面

```shell
[root@192 ~]# vncviewer :5900
```

和普通的Linux系统安装一样，安装完成后，重启系统即可进入刚才安装的客户机操作系统。

在宿主机中需要安装包含vncserver和vncviewer工具的软件包，如在RHEL 7系统中，可以安装`tigervnc-server`和`tigervnc`这两个RPM软件包。

### 3.5 启动第一个KVM客户机

在安装好了系统之后，就可以使用镜像文件来启动并登录到自己安装的系统之中了。
通过如下的简单命令行即可启动一个KVM的客户机。

```shell
[root@desktop-pmjtngi ~]# qemu-system-x86_64 -m 1G -smp 1 /root/centos7.img
```

如下的3个等价命令之一启动一个客户机。

```shell
qemu-system-x86_64 -m 1024 -smp 2 /root/centos7.img
qemu-system-x86_64 -m 1024 -smp 2 -hda /root/centos7.img
qemu-system-x86_64 -m 1024 -smp 2 -drive file=/root/centos7.img,if=ide
```



用vncviwer命令（此处命令为vncviwer：5900）查看客户机的启动情况。





### 3.6 KVM虚拟机出现启动不了的情况 本地FSCK修复QCOW2

https://www.freesion.com/article/877878798/
