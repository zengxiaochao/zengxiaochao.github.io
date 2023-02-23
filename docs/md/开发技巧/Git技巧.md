### 1.本地仓库搭建
1. 使用现有文件搭建新仓库
```
## 初始化仓库
git init 

## 添加所有文件到仓库暂存区域
git add .

## 提交暂存文件到本地仓库
git commit -m "提交描述"

## 本地仓库新建主要分支
git branch -M main

## 连接远程仓库地址
git remote add origin http://172.16.20.101/test_git_group/jadlutils.git

## 推送本地仓库到远程仓库
git push -u origin main
```
2. 直接克隆远程仓库
```
git clone http://172.16.20.101/test_git_group/jadlutils.git
```

### 2.拉取代码
```
git pull
```
### 3.提交代码
```
git add .
git commit -m "提交描述"
git push
```
### 4.刷新ignore
```bash
git rm -r --cached .
git add .
git commit -m "refresh ingore"
git push
```