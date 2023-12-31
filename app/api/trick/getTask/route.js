import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {parseCookie} from "@/app/utils/parseCookie";

export async function GET(req) {
    const cookieInfo = parseCookie(req);
    try {
        const userInfo = await executeQuery({
            // 查询有无此用户
            query: 'SELECT lover FROM userinfo WHERE userEmail = ?',
            values: [cookieInfo.name]
        });
        const result = await executeQuery({
            // 查询任务列表
            query: 'SELECT * FROM tasklist WHERE publisherEmail = ? OR publisherEmail = ? OR  receiverEmail = ? ORDER BY taskId DESC',
            values: [cookieInfo.name, userInfo[0].lover, cookieInfo.name]
        });
        // console.log('result',result)
        result.forEach(item => {
            item.taskImage = item.taskImage.split(',');
            item["taskStatus"] = item.completionTime ? '已完成' : (item.acceptanceTime ? '已接受' : '未开始')
        })

        return Response.json(BizResult.success(result, '获取列表成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}