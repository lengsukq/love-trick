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
        const taskStatus = searchParams.get('taskStatus') || null;
        const searchWords = searchParams.get('searchWords') ? searchParams.get('searchWords') : '';
        const current = parseInt(searchParams.get('current') ?? '1', 10); // 获取当前页码，默认为1
        const pageSize = parseInt(searchParams.get('pageSize') ?? '10', 10); // 获取每页显示的条目数，默认为10
        const offset = (current - 1) * pageSize; // 计算偏移量
        let result;
        result = await executeQuery({
            // 查询任务列表
            query:  `SELECT * FROM tasklist WHERE
             (publisherEmail = ? OR publisherEmail = ? OR receiverEmail = ?)
             AND (taskStatus = ? OR ? IS NULL)
             AND taskName LIKE ?
             ORDER BY taskId DESC LIMIT ?, ?`,
            values: [userEmail, lover, userEmail, taskStatus,taskStatus, `%${searchWords}%`, offset, pageSize]
        });
        // if (taskStatus) {
        //     console.log('带状态')
        //     result = await executeQuery({
        //         // 查询任务列表
        //         query: `SELECT * FROM tasklist WHERE (publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ?) AND taskStatus = ? AND taskName LIKE ? ORDER BY taskId DESC LIMIT ?, ?`,
        //         values: [userEmail, lover, userEmail, taskStatus, `%${searchWords}%`, offset, pageSize]
        //     });
        // } else {
        //     result = await executeQuery({
        //         // 查询任务列表
        //         query: `SELECT * FROM tasklist WHERE (publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ?) AND taskName LIKE ? ORDER BY taskId DESC LIMIT ?, ?`,
        //         values: [userEmail, lover, userEmail, `%${searchWords}%`, offset, pageSize]
        //     });
        // }
        // 计算总条目数
        const totalCountResult = await executeQuery({
            query: `SELECT COUNT(*) AS totalCount  FROM tasklist 
            WHERE (publisherEmail = ? OR publisherEmail = ? OR receiverEmail = ?) 
            AND (taskStatus = ? OR ? IS NULL)
             AND taskName LIKE ?`,
            values: [userEmail, lover, userEmail,taskStatus,taskStatus,`%${searchWords}%`]
        });

        const totalCount = totalCountResult[0].totalCount;
        const totalPages = Math.ceil(totalCount / pageSize);
        console.log('totalPages', totalCount,totalPages)
        result.forEach(item => {
            item.taskImage = item.taskImage.split(',');
            item["isApprove"] = item.isApprove !== 0;
        })

        return Response.json(BizResult.success({record: result, total: totalCount,pageSize: pageSize,totalPages: totalPages,current: current}, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}
