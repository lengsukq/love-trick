'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";

export async function PUT(request) {
}

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url)
        const giftId = searchParams.get('giftId')
        const remained = searchParams.get('remained');

        const result = await executeQuery({
            // 修改是否展示
            query: 'UPDATE gift_list SET remained = ? WHERE giftId = ?',
            values: [remained, giftId]
        });

        return Response.json(BizResult.success('', `修改库存成功`))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
