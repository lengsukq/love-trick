'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import {getWhisper} from "@/app/utils/commonSQL";

export async function PUT(request) {
}

export async function GET(req) {
    try {
        const {userEmail} = await cookieTools(req);
        const {searchParams} = new URL(req.url)
        const searchWords = searchParams.get('searchWords') ? searchParams.get('searchWords') : '';
        const result = await getWhisper(userEmail,searchWords)
        return Response.json(BizResult.success(result, '获取留言列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
