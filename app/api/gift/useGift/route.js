'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {sendMsg} from "@/app/utils/third-party-tools";
import {cookieTools} from "@/app/utils/cookieTools";
import {getGiftScore} from "@/app/utils/commonSQL";

export async function PUT(request) {
}

export async function GET(req) {
    try {
        const {userName} = cookieTools(req);
        const {searchParams} = new URL(req.url)
        const giftId = searchParams.get('giftId')
        const scoreResult = await getGiftScore(giftId);
        const giftName = scoreResult[0].giftName;
        const result = await executeQuery({
            // 修改是否展示
            query: 'UPDATE gift_list SET used = used + ? WHERE giftId = ?',
            values: [1, giftId]
        });
        sendMsg(`${userName}使用了礼物“${giftName}”`)
        return Response.json(BizResult.success('', `礼物“${giftName}”使用成功`))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
