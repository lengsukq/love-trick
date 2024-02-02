'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";

export async function PUT(request) {
}

export async function GET(req) {
    try {
        const {lover} = await cookieTools(req);
        const {searchParams} = new URL(req.url)
        const searchWords = searchParams.get('searchWords') ? searchParams.get('searchWords') : '';
        let result;
        result = await executeQuery({
            // 查询任务列表
            query: `SELECT gift_list.*,favourite_list.* FROM gift_list LEFT JOIN favourite_list ON collectionId = giftId WHERE (publisherEmail = ?) AND giftName LIKE ? AND isShow = 1 ORDER BY GiftId DESC`,
            values: [lover, `%${searchWords}%`]
        });
        return Response.json(BizResult.success(result, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
