<!--
 * @Author: zengfanchao zengfanchao@jadlsoft.com
 * @Date: 2023-07-10 14:51:09
 * @LastEditors: zengfanchao zengfanchao@jadlsoft.com
 * @LastEditTime: 2023-07-11 09:54:26
 * @FilePath: \VsCodeWork\md\202307\HTTPS自签证书部署服务.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## HTTPS自签证书以及Nginx部署服务
### 1.安装openssl
对于centos直接安装
```sh
yum install openssl openssl-devel
```
### 2.生成证书
一、生成CA证书私钥
```sh
openssl genrsa -aes128 -passout pass:20230421 -out ca_private.key 2048
```
生成CA证书请求文件
```sh
openssl req -new -key ca_private.key -passin pass:20230421 -out ca_req.csr -days 7300
```
基本信息用
-- jadltest.com
-- jadltest@1663.com
-- 20230421
```sh
openssl req -text -in ca_req.csr -noout
```
生成CA根证书
```sh
openssl x509 -req -in ca_req.csr -signkey ca_private.key -out ca_root.crt -days 7300 -passin pass:20230421
```
二、生成服务端的证书私钥
```sh
openssl genrsa -aes128 -passout pass:20230421 -out appServer_private.key 2048
```
去除密码。
在加载SSL支持的Nginx并使用上述私钥时除去必须的口令，否则会在启动nginx的时候需要输入密码。
复制appServer_private.key并重命名为appServer_private.key.org生成服务器公钥
```sh
openssl rsa -in appServer_private.key -pubout -out appServer_public.pem
```
生成服务端的待签名证书
```sh
openssl req -new -key appServer_private.key -passin pass:20230421 -out appServer_req.csr -days 365
```
使用CA根证书对服务端证书签名,需要重新输入密码20230421
```sh
openssl x509 -req -in appServer_req.csr -days 365 -CAkey ca_private.key -CA ca_root.crt -CAcreateserial -out appServer.crt
```
二、生成客户端的证书私钥
```sh
openssl genrsa -aes128 -passout pass:20230421 -out appClient_private.key 2048
```
需要重新输入密码20230421
```sh 
openssl rsa -in appClient_private.key -pubout -out appClient_public.pem
```
```sh
openssl rsa -in appClient_private.key.org -out appClient_private.key
```
```sh
openssl req -new -key appClient_private.key -out appClient.csr
```
```sh
openssl x509 -req -CA ca_root.crt -CAkey ca_private.key -CAcreateserial -in appClient.csr -out appClient.crt
```
注意:IE对于证书验证比较严格
### 4.配置Nginx
配置nginx.conf:
```

```