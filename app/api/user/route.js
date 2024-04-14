'use server'
import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";
import {cookies} from 'next/headers'
import {cookieTools, encryptData} from "@/app/utils/cookieTools";
import dayjs from "dayjs";
import {randomImages} from "@/app/utils/third-party-tools";

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url)
        const username = searchParams.get('username');
        const password = searchParams.get('password');
        console.log('searchParams', searchParams, 'username---', username, 'password---', password)

        const result = await executeQuery({
            // 查询有无此用户
            query: 'SELECT userId, userEmail, lover,score FROM userinfo WHERE username = ? AND password = ?',
            values: [username, password]
        });
        console.log("result", result[0]);
        if (result.length > 0) {
            let {userId, userEmail,lover} = result[0]
            const oneDay = 60 * 1000 * 60 * 24 * 365
            const cookie = encryptData({
                userEmail: userEmail, userId: userId, userName: username, lover:lover
            })
            cookies().set({
                name: userEmail,
                value: cookie,
                httpOnly: false,
                path: '/',
                expires: Date.now() + oneDay
            })
            return Response.json(BizResult.success(result[0], '登录成功'), {
                status: 200,
                headers: {'Set-Cookie': `cookie=${JSON.stringify(cookies().get(userEmail))}`},
            })
        } else {
            return Response.json(BizResult.fail(result, '请检查用户名密码'))
        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
export async function POST(req) {

    try {
        const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const jsonData = await req.json();
        const {userEmail, username, password, describeBySelf, lover} = jsonData;
        if (!userEmail || !username || !password || !describeBySelf || !lover){
            return Response.json(BizResult.fail('', '请检查注册信息是否填写正确'))
        }
        if (userEmail === lover){
            return Response.json(BizResult.fail('', '用户邮箱与关联者邮箱不可相同'))
        }
        const imgURL = jsonData.avatar;
        // 获取随机图片
        const avatar = imgURL ? imgURL : await randomImages()
        const result = await executeQuery({
            // 新增用户
            query: 'INSERT INTO userinfo (userEmail,username, password, avatar, describeBySelf, registrationTime,lover) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [userEmail, username, password, avatar, describeBySelf, creationTime, lover]
        });

        return Response.json(BizResult.success('', '创建账号成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
