'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";
import {sendMsg} from "@/app/utils/third-party-tools";
import dayjs from "dayjs";

export async function POST(req) {
    try {
        const {userEmail,userName} = cookieTools(req);
        const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const jsonData = await req.json();
        const {title, content} = jsonData;
        if (!title || !content){
            return Response.json(BizResult.fail('', '请填写完整内容'))
        }
        const result = await executeQuery({
            // 插入任务数据
            query: 'INSERT INTO whisper_list (title, content, creationTime,publisherEmail) VALUES (?, ?, ?, ?)',
            values: [title, content, creationTime, userEmail]
        });
        sendMsg(`${userName}发布新的留言了，快去看看吧`)
        return Response.json(BizResult.success('', '发布留言成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
