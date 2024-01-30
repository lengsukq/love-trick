'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import {addScore, getGiftScore, subtractScore} from "@/app/utils/commonSQL";

export async function PUT(request) {
}

export async function GET(req) {
    const {userEmail, lover} = await cookieTools(req);
    const {searchParams} = new URL(req.url)
    const giftId = searchParams.get('giftId')

    try {
        // 查询礼物分数
        const scoreResult = await getGiftScore(giftId);
        const giftScore = scoreResult[0].needScore;
        const remained = scoreResult[0].remained;
        console.log('giftScore',giftScore,'redeemed',remained)
        if (remained<=0){
            return Response.json(BizResult.success("", '礼物兑换失败，库存不足'))
        }
        // 为兑换者扣减分数
        const subtractResult = await subtractScore(giftScore,userEmail);
        if (subtractResult.hasOwnProperty('error')){
            return Response.json(BizResult.success('', subtractResult.error))
        }
        const giftResult = await executeQuery({
            // 扣减数据
            query: 'UPDATE gift_list SET redeemed = redeemed + ? ,remained = remained - ? WHERE giftId = ?',
            values: [1, 1, giftId]
        });
        // 为发布者添加分数
        await addScore(giftScore,lover);

        return Response.json(BizResult.success(giftResult, '兑换礼物成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
