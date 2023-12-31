import BizResult from "@/app/utils/BizResult";
import {parseCookie} from "@/app/utils/parseCookie";
import executeQuery from "@/app/utils/db";
import dayjs from "dayjs";

export async function POST(req) {
    const contentType = req.headers.get('content-type');
    const cookieInfo = parseCookie(req);
    const {name} = cookieInfo;
    const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const jsonData = await req.json();
    console.log('jsonData', jsonData)
    const {taskName, taskDetail, taskReward} = JSON.parse(jsonData);
    const taskImage = ["https://www.freeimg.cn/i/2023/12/31/659105191c747.png", "https://www.freeimg.cn/i/2023/12/31/6590d524efbdb.jpg"]
    console.log('数值------', [taskName, taskDetail, taskImage.toString(), taskReward, creationTime, name])
    try {
        const userInfo = await executeQuery({
            // 查询有无此用户
            query: 'SELECT username FROM userinfo WHERE userEmail = ?',
            values: [name]
        });
        console.log('userInfo', userInfo)
        const result = await executeQuery({
            // 查询有无此用户
            query: 'INSERT INTO tasklist (taskName, taskDetail, taskImage, taskReward, creationTime, publisherName,publisherEmail) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [taskName, taskDetail, taskImage.toString(), taskReward, creationTime, userInfo[0].username, name]
        });
        console.log("result", result[0]);
        return Response.json(BizResult.success('', '任务发布成功'))

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}