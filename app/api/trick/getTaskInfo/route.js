'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import dayjs from "dayjs";
import {sendMsg} from "@/app/utils/sendMSgByWXRobot";

export async function DELETE(req) {
    // const {userName} = cookieTools(req);
    const {searchParams} = new URL(req.url)
    const taskId = searchParams.get('taskId')
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'DELETE FROM tasklist WHERE taskId = ?',
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
            item["isApprove"] = item.isApprove !== 0;
        })

        return Response.json(BizResult.success(result[0], '获取任务详情成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail(''))
    }
}

export async function POST(req) {
    const {userEmail,userName} = cookieTools(req);
    const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {actType, taskId, completeRemarks,taskName} = JSON.parse(jsonData);
    try {
        if (actType === 'accept') {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET receiverEmail = ?, acceptanceTime = ? ,taskStatus = ? WHERE tasklist.taskId = ?',
                values: [userEmail, nowTime,"已接受", taskId]
            });
            console.log("result", result[0]);
            await sendMsg(`${userName}已接受任务：${taskName}`);

            return Response.json(BizResult.success('', '接受任务成功'))
        } else if (actType === 'complete') {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET completeRemarks = ?, completionTime = ? ,taskStatus = ? WHERE tasklist.taskId = ?',
                values: [completeRemarks, nowTime, "待核验", taskId]
            });
            console.log("result", result[0]);
            await sendMsg(`${userName}已完成任务：${taskName}，等待发布者核验任务情况`);

            return Response.json(BizResult.success('', '已完成任务，等待发布者核验任务情况'))
        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
