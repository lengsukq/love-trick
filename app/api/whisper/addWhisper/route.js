'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";
import {randomImages} from "@/app/utils/third-party-tools";
import dayjs from "dayjs";

export async function POST(req) {
    try {
        const {userEmail} = cookieTools(req);
        const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const jsonData = await req.json();
        const {title, content} = jsonData;
        const result = await executeQuery({
            // 插入任务数据
            query: 'INSERT INTO whisper_list (title, content, creationTime,publisherEmail) VALUES (?, ?, ?, ?)',
            values: [title, content, creationTime, userEmail]
        });
        console.log("result", result[0]);
        return Response.json(BizResult.success('', '发布留言成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
