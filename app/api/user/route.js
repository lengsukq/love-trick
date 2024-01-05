'use server'
import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";
import {cookies} from 'next/headers'
import {encryptData} from "@/app/utils/cookieTools";

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const username = searchParams.get('username')
    const password = searchParams.get('password')
    console.log('searchParams', searchParams, 'username---', username, 'password---', password)

    try {
        const result = await executeQuery({
            // 查询有无此用户
            query: 'SELECT userId, userEmail,lover FROM userinfo WHERE username = ? AND password = ?',
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
            return Response.json(BizResult.success(result, '登录成功'), {
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
