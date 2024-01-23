'use server'
import BizResult from "@/app/utils/BizResult";
import executeQuery from "@/app/utils/db";
import {cookieTools} from "@/app/utils/cookieTools";
import dayjs from "dayjs";
import {sendMsg} from "@/app/utils/sendMSgByWXRobot";
import {addScore, getTaskDetail} from "@/app/utils/scoreByServer";


export async function DELETE(req) {
    // const {userName} = cookieTools(req);
    const {searchParams} = new URL(req.url)
    const taskId = searchParams.get('taskId')
    try {
        const taskDetail = await getTaskDetail(taskId);
        const {publisherEmail,taskStatus,taskScore} = {...taskDetail[0]}
        if (taskStatus==="已核验"){
            return Response.json(BizResult.fail('','已核验的任务无法删除'))
        }else{
            await addScore(taskScore,publisherEmail)
        }

        const result = await executeQuery({
            // 删除任务列表
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

// 接受或完成任务
export async function POST(req) {
    const {userEmail, userName} = cookieTools(req);
    const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {actType, taskId, completeRemarks, taskName} = JSON.parse(jsonData);
    try {

        const actTypeObj = {
            accept: ["已接受", `${userName}已接受任务：${taskName}`, "接受任务成功"],
            complete: ["已完成", `${userName}已完成任务：${taskName}——等待发布者核验任务情况`, "已完成任务，等待发布者核验任务情况"],
            notPassed: ["未通过", `任务：${taskName}——已被驳回`, "已驳回任务"],
            pass: ["已核验", `${userName}已核验任务：${taskName}`, "已核验任务"]
        }
        const taskDetail = await getTaskDetail(taskId);
        const {publisherEmail,receiverEmail,taskScore} = {...taskDetail[0]}
        if (actType === 'accept' && publisherEmail!==userEmail) {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET receiverEmail = ?, acceptanceTime = ? ,taskStatus = ? WHERE tasklist.taskId = ?',
                values: [userEmail, nowTime, "已接受", taskId]
            });


        } else if (actType === 'complete' && publisherEmail!==userEmail) {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET completeRemarks = ?, completionTime = ? ,taskStatus = ? WHERE tasklist.taskId = ?',
                values: [completeRemarks, nowTime, "待核验", taskId]
            });

        } else if (actType === 'notPassed' && publisherEmail===userEmail) {
            const result = await executeQuery({
                query: 'UPDATE tasklist SET completeRemarks = ?, completionTime = ? ,taskStatus = ? WHERE tasklist.taskId = ?',
                values: ["", "", "已接受", taskId]
            });
        } else if (actType === 'pass' && publisherEmail===userEmail){
            const result = await executeQuery({
                query: 'UPDATE tasklist SET taskStatus = ? WHERE tasklist.taskId = ?',
                values: ["已核验", taskId]
            });
            await addScore(taskScore,receiverEmail);
        }else{
            return Response.json(BizResult.fail('', '系统异常'))
        }

        await sendMsg(actTypeObj[actType][1]);

        return Response.json(BizResult.success('', actTypeObj[actType][2]))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
