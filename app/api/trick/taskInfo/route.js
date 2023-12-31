import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {parseCookie} from "@/app/utils/parseCookie";

export async function GET(req) {
    const cookieInfo = parseCookie(req);
    const {searchParams} = new URL(req.url)
    const taskId = searchParams.get('taskId')
    if (!taskId) {
        return Response.json(BizResult.fail('', '未获取到任务Id'))
    }
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'SELECT * FROM tasklist WHERE taskId = ?',
            values: [taskId]
        });
        result.forEach(item => {
            item.taskImage = item.taskImage.split(',');
            item["taskStatus"] = item.completionTime ? '已完成' : (item.acceptanceTime ? '已接受' : '未开始')
        })

        return Response.json(BizResult.success(result[0], '获取任务详情成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}