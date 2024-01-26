'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";
import dayjs from "dayjs";
import {randomImages} from "@/app/utils/sendMSgByWXRobot";

export async function POST(req) {
    // const contentType = req.headers.get('content-type');
    const {userEmail, userName} = cookieTools(req);
    const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {giftName, giftDetail, needScore, remained, isShow} = jsonData;
    const imgURL = jsonData.taskImage;
    // 获取随机图片
    const giftImg = imgURL ? imgURL : await randomImages()
    try {
        const result = await executeQuery({
            // 插入任务数据
            query: 'INSERT INTO gift_list (publisherEmail,giftImg, giftName, giftDetail, needScore, remained,isShow) VALUES (?, ?, ?, ?, ?, ?)',
            values: [userEmail, giftImg, giftName, giftDetail, needScore, remained, isShow]
        });
        // await subtractScore(taskScore, userEmail)
        console.log("result", result[0]);
        // await sendMsg(`${userName}发布新任务：${taskName}`);
        return Response.json(BizResult.success('', '发布成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
