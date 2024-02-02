'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";
import dayjs from "dayjs";

export async function POST(req) {
    try {
        const {userEmail} = cookieTools(req);
        const jsonData = await req.json();
        const {id, type} = jsonData;
        const creationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const typeObj = ['gift','task','whisper'];
        if (!typeObj.includes(type)){
            return Response.json(BizResult.fail('', '收藏类型错误'))
        }
        const isExists = await executeQuery({
            query: `SELECT * FROM favourite_list WHERE collectionId = ?`,
            values: [id]
        });
        for (let i of isExists){
            if (i.collectionId === Number(id) && i.collectionType === type){
                await executeQuery({
                    // 插入任务数据
                    query: 'DELETE FROM favourite_list WHERE favId = ?',
                    values: [i.favId]
                });
                return Response.json(BizResult.success('', '已取消收藏'))
            }
        }
        await executeQuery({
            // 插入任务数据
            query: 'INSERT INTO favourite_list (userEmail,collectionId, collectionType, creationTime) VALUES (?, ?, ?, ?)',
            values: [userEmail, id, type, creationTime]
        });
        return Response.json(BizResult.success('', '收藏成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
