## 项目简介
情侣之间发布任务，接受任务

![index.jpg](readmeImg%2Findex.jpg)
```text
本地根目录创建.env.local文件，配置必要数据
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
图床只要选择一个即可，选择b站相关的图床，BILIBILI_SESSDATA和BILIBILI_CSRF必须都要填
如果要使用b站视频封面上传，需要取消注释posttask/page文件中的某行代码

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
