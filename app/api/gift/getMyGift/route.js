'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";

export async function PUT(request) {
}

export async function GET(req) {
    try {

        const {userEmail, lover} = await cookieTools(req);
        const {searchParams} = new URL(req.url)
        const type = searchParams.get('type')
        const searchWords = searchParams.get('searchWords') ? searchParams.get('searchWords') : '';
        let result;
        if (type === '已上架' || type === '已下架') {
            console.log('带状态')
            result = await executeQuery({
                query: `SELECT gift_list.*,favourite_list.* FROM gift_list LEFT JOIN favourite_list ON collectionId = giftId AND collectionType = 'gift' WHERE (publisherEmail = ?) AND giftName LIKE ? AND isShow = ? ORDER BY GiftId DESC`,
                values: [userEmail, `%${searchWords}%`, type === '已上架' ? 1 : 0]
            });
        } else if (type === '待使用') {
            result = await executeQuery({
                // 获取售出-已使用大于零的数据
                query: `SELECT gift_list.*,favourite_list.* FROM gift_list LEFT JOIN favourite_list ON collectionId = giftId AND collectionType = 'gift' WHERE ((redeemed - used) > 0) AND (publisherEmail = ?)`,
                values: [lover]
            });
            result.forEach(item => {
                item["use"] = item.redeemed - item.used;
            })
        } else if (type === '已用完') {
            result = await executeQuery({
                // 获取售出-已使用等于零的数据
                query: `SELECT gift_list.*,favourite_list.* FROM gift_list LEFT JOIN favourite_list ON collectionId = giftId AND collectionType = 'gift' WHERE ((redeemed - used) = 0) AND (publisherEmail = ?) AND used != 0`,
                values: [lover]
            });
            result.forEach(item => {
                item["use"] = item.redeemed - item.used;
            })
        } else {
            result = await executeQuery({
                query: `SELECT gift_list.*,favourite_list.* FROM gift_list LEFT JOIN favourite_list ON collectionId = giftId AND collectionType = 'gift' WHERE (publisherEmail = ?) AND giftName LIKE ? ORDER BY GiftId DESC`,
                values: [userEmail, `%${searchWords}%`]
            });
        }


        return Response.json(BizResult.success(result, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
