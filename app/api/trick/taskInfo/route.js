import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import dayjs from "dayjs";
import {sendMsg} from "@/app/utils/sendMSgByWXRobot";

export async function DELETE(req) {
    const {username} = cookieTools(req);
    const {searchParams} = new URL(req.url)
    const taskId = searchParams.get('taskId')
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'DELETE FROM tasklist WHERE taskId = ?;',
            values: [taskId]
        });
        return Response.json(BizResult.success(result, '删除任务成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }


}
export async function GET(req) {
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

export async function POST(req) {
    const {userEmail,username} = cookieTools(req);
    const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {actType, taskId, completeRemarks,taskName} = JSON.parse(jsonData);
    try {
        if (actType === 'accept') {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET receiverEmail = ?, acceptanceTime = ? WHERE tasklist.taskId = ?',
                values: [userEmail, nowTime, taskId]
            });
            console.log("result", result[0]);
            await sendMsg(`${username}已接受任务：${taskName}`);

            return Response.json(BizResult.success('', '接受任务成功'))
        } else if (actType === 'complete') {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET completeRemarks = ?, completionTime = ? WHERE tasklist.taskId = ?',
                values: [completeRemarks, nowTime, taskId]
            });
            console.log("result", result[0]);
            await sendMsg(`${username}已完成任务：${taskName}`);

            return Response.json(BizResult.success('', '已完成任务'))
        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
