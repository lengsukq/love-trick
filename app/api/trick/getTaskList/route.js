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
        const taskStatus = searchParams.get('taskStatus');
        const searchWords = searchParams.get('searchWords') ? searchParams.get('searchWords') : '';
        let result;
        if (taskStatus) {
            console.log('带状态')
            result = await executeQuery({
                // 查询任务列表
                query: `SELECT * FROM tasklist WHERE (publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ?) AND taskStatus = ? AND taskName LIKE ? ORDER BY taskId DESC`,
                values: [userEmail, lover, userEmail, taskStatus, `%${searchWords}%`]
            });
        } else {
            result = await executeQuery({
                // 查询任务列表
                query: `SELECT * FROM tasklist WHERE (publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ?) AND taskName LIKE ? ORDER BY taskId DESC`,
                values: [userEmail, lover, userEmail, `%${searchWords}%`]
            });
        }

        result.forEach(item => {
            item.taskImage = item.taskImage.split(',');
            item["isApprove"] = item.isApprove !== 0;
        })

        return Response.json(BizResult.success(result, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
