'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import {addScore, getGiftScore, subtractScore} from "@/app/utils/scoreByServer";

export async function PUT(request) {
}

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const giftId = searchParams.get('giftId')
    const isShow = searchParams.get('isShow')==="1"?1:0;
    console.log('isShow',searchParams.get('isShow'))
    try {
        const result = await executeQuery({
            // 修改是否展示
            query: 'UPDATE gift_list SET isShow = ? WHERE giftId = ?',
            values: [isShow, giftId]
        });

        return Response.json(BizResult.success('', `${isShow===1?'上架成功':'下架成功'}`))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
