'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";

export async function POST(req) {
    try {
        const {userEmail} = await cookieTools(req);
        const jsonData = await req.json();
        console.log('jsonData', jsonData)
        const {username, avatar, describeBySelf} = jsonData;
        const result = await executeQuery({
            // 查询用户信息
            query: "UPDATE userinfo SET username = ?,avatar = ?,describeBySelf=? WHERE userEmail = ?",
            values: [username, avatar, describeBySelf, userEmail]
        });
        if (result.error) {
            return Response.json(BizResult.fail(result.error))

        } else {
            return Response.json(BizResult.success(result[0], '更新用户信息成功'))

        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}

// 获取用户信息
export async function GET(req) {
    try {
        const {userEmail} = await cookieTools(req);
        const result = await executeQuery({
            // 查询用户信息
            query: "SELECT * FROM userinfo WHERE userEmail = ?",
            values: [userEmail]
        });
        console.log('result', result[0])
        delete result[0].password;
        return Response.json(BizResult.success(result[0], '获取用户信息成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
