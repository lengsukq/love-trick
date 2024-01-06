'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";

export async function GET(req) {
    const {userEmail} = await cookieTools(req);
    console.log('开始获取用户信息', userEmail)
    try {
        const result = await executeQuery({
            // 查询用户信息
            query: "SELECT * FROM userinfo WHERE userEmail = ?",
            values: [userEmail]
        });
        console.log('result', result[0])

        return Response.json(BizResult.success(result[0], '获取用户信息成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
