'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import {getScore} from "@/app/utils/scoreByServer";


// 查询积分
export async function GET(req) {
    try {
        const {userEmail} = await cookieTools(req);
        const result = await getScore(userEmail);
        if (result.error){
            return Response.json(BizResult.fail(result.error))

        }else{
            return Response.json(BizResult.success(result[0], '查询积分成功'))

        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
