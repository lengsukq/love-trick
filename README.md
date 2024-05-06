# 项目简介
情侣之间发布任务，接受任务

## 实现功能

1. 用户注册登录、发布任务 （注册点击登录页圆形大图）
2. 类商品交易系统，获取积分后可以直接兑换礼物（商品），也可以上架自己的礼物给对方兑换 
3. 上传图片完全不占用服务器空间，使用第三方图床，让家庭自建服务器也能实现高清大图 
4. 积分系统，发布完成任务都能加减积分  
5. 拥有留言功能，可以给对方留言
6. 发布接受完成任务以及使用礼物都会有微信企业机器人通知
***
![mainImg.png](readmeImg%2FmainImg.png)
## 无需服务器，0成本搭建教程 
https://blog.lengsu.top/article/love-trick


### 数据库表结构

![sql.png](readmeImg%2Fsql.png)

### 本地根目录创建.env.local文件，配置必要数据
```text
MYSQL_HOST= 数据库ip
MYSQL_PORT= 数据库端口
MYSQL_DATABASE= 数据库名
MYSQL_USER= 数据库用户名
MYSQL_PASSWORD= 数据库密码
WX_ROBOT_URL= 企业微信机器人的url 如：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=11111111-xxxx-xxxx-xxxx-xxxxxxxxxxxx
JWT_SECRET_KEY= xxxxxxx cookie加密密钥，随便写
DRAWING_BED = BilibiliDaily 图床选择：SM：sm图床 BilibiliDaily：哔哩哔哩动态或专栏 BilibiliCover：哔哩哔哩视频封面 IMGBB：IMGBB 图床
SM_TOKEN = SM图床注册后获取的API 地址：https://smms.app/
BILIBILI_SESSDATA = 登录bilibili后获取的sessdata 参考：https://www.yuque.com/xlzy520/blog/fydq8g?
BILIBILI_CSRF = 同上
IMGBB_API = IMGBB图床API 地址：https://imgbb.com/
```
图床选择一个后填写相关的值即可其他没选的可以不填，选择b站相关的图床，BILIBILI_SESSDATA和BILIBILI_CSRF必须都要填
如果要使用b站视频封面上传，需要取消注释postTask/page文件中的某行代码（转base64）

## 仍旧存在的一些缺陷（任会慢慢改进）
* sql语句不够严谨
* 未将cookie进行服务器端二次校验(已优化)
* 某些接口没有进行二次校验就写入数据库
* 部分功能缺少二次确认逻辑

## docker打包运行
1. 构建镜像
```shell
docker build -t love-trick .
```
2. 运行容器
```shell
docker run -d -p 9999:9999 --name love-trick \
  -e MYSQL_HOST=你的数据库ip地址 \
  -e MYSQL_PORT=你的数据库端口 \
  -e MYSQL_DATABASE=你的数据库名称 \
  -e MYSQL_USER=你的数据库用户名 \
  -e MYSQL_PASSWORD=你的数据库用户密码 \
  -e WX_ROBOT_URL=你的微信机器人地址 \
  -e JWT_SECRET_KEY=你的cookie加密密钥 \
  -e DRAWING_BED=你选择的图床 \
  -e SM_TOKEN=SM的TOKEN \
  -e BILIBILI_SESSDATA=哔哩哔哩账号的SESSDATA \
  -e BILIBILI_CSRF=哔哩哔哩账号的CSRF \
  -e IMGBB_API=IMGBB的TOKEN \
  -e WEB_URL=你的部署成功后的网站地址 \
  love-trick
```

## 开发启动流程
1. 安装依赖
```shell
yarn
```
2. 启动项目
```shell
yarn dve
```
3. 访问项目地址
```text
http://localhost:9999/
```

## 发布到生产环境

1. 安装依赖 
```shell
yarn
```
2. 编译
```shell
yarn build
```
3. 启动项目
```shell
yarn start
```
4. 访问项目地址
```text
http://你的ip地址:9999/
```
