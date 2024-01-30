'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import {getScore} from "@/app/utils/commonSQL";

export async function PUT(req) {
}

// 查询积分
export async function GET(req) {
    try {
        const {userEmail} = await cookieTools(req);
        const result = await getScore(userEmail);
        return Response.json(BizResult.success(result[0], '查询积分成功'))

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
