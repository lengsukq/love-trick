'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";
import dayjs from "dayjs";
import {randomImages, sendMsg} from "@/app/utils/sendMSgByWXRobot";
import {getScore, subtractScore} from "@/app/utils/scoreByServer";

export async function POST(req) {
    // const contentType = req.headers.get('content-type');
    const {userEmail, userName} = cookieTools(req);
    const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {taskName, taskDetail, taskReward, taskScore} = jsonData;
    const imgURL = jsonData.taskImage;
    // 获取随机图片
    const taskImage = imgURL ? imgURL : await randomImages()
    try {
        const {score} = (await getScore(userEmail))[0];
        if (score < taskScore) {
            return Response.json(BizResult.fail('', '积分不足，无法发布任务'))
        }

        const result = await executeQuery({
            // 插入任务数据
            query: 'INSERT INTO tasklist (taskName, taskDetail, taskImage, taskReward, taskScore,creationTime, publisherName,publisherEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            values: [taskName, taskDetail, taskImage.toString(), taskReward, taskScore, creationTime, userName, userEmail]
        });
        await subtractScore(taskScore, userEmail)
        console.log("result", result[0]);
        await sendMsg(`${userName}发布新任务：${taskName}`);
        return Response.json(BizResult.success('', '任务发布成功'))

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
