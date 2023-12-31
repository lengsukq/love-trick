'use server'
import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";
import {cookies} from 'next/headers'
export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const username = searchParams.get('username')
    const password = searchParams.get('password')
    console.log('searchParams', searchParams, 'username---', username, 'password---', password)

    try {
        const result = await executeQuery({
            // 查询有无此用户
            query: 'SELECT userId, userEmail FROM userinfo WHERE username = ? AND password = ?',
            values: [username, password]
        });
        console.log("result", result[0]);
        if (result.length > 0) {
            let {userId, userEmail} = result[0]
            const oneDay = 60 * 1000 * 60 * 24 * 365
            cookies().set({
                name: userEmail,
                value: userId,
                httpOnly: false,
                path: '/',
                expires: Date.now() + oneDay
            })
            console.log('getCookie--', JSON.stringify(cookies().get(userEmail)))
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