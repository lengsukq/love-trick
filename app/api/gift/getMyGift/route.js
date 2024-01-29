'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import {randomImages} from "@/app/utils/sendMSgByWXRobot";

export async function PUT(request) {
}
export async function GET(req) {
    const {userEmail} = await cookieTools(req);
    const {searchParams} = new URL(req.url)
    // const taskStatus = searchParams.get('taskStatus');
    const searchWords = searchParams.get('searchWords')?searchParams.get('searchWords'):'';
    // console.log('taskStatus',taskStatus,"searchWords",searchWords)
    try {
        let result;
        result = await executeQuery({
            // 查询任务列表
            query: `SELECT * FROM gift_list WHERE (publisherEmail = ?) AND giftName LIKE ? ORDER BY GiftId DESC`,
            values: [userEmail,`%${searchWords}%`]
        });
        // if (taskStatus){
        //     console.log('带状态')
        //     result = await executeQuery({
        //         // 查询任务列表
        //         query: `SELECT * FROM gift_list WHERE (publisherEmail = ? OR publisherEmail = ? ) AND taskStatus = ? AND taskName LIKE ? ORDER BY taskId DESC`,
        //         values: [userEmail, lover, userEmail,taskStatus,`%${searchWords}%`]
        //     });
        // }else{
        //     result = await executeQuery({
        //         // 查询任务列表
        //         query: `SELECT * FROM tasklist WHERE (publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ?) AND taskName LIKE ? ORDER BY taskId DESC`,
        //         values: [userEmail, lover, userEmail,`%${searchWords}%`]
        //     });
        // }


        return Response.json(BizResult.success(result, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
