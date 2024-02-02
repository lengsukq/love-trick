'use server'
import BizResult from "@/app/utils/BizResult";
import {cookieTools} from "@/app/utils/cookieTools";
import executeQuery from "@/app/utils/db";

export async function POST(req) {
    try {
        const {userEmail} = cookieTools(req);
        const jsonData = await req.json();
        const {type} = jsonData;
        const typeObj = {'gift':"gift_list",'task':'tasklist','whisper':'whisper_list'};
        if (!typeObj.hasOwnProperty(type)){
            return Response.json(BizResult.fail('', '收藏类型错误'))
        }

        const result = await executeQuery({
            query: `SELECT favourite_list.*,${typeObj[type]}.* FROM favourite_list JOIN ${typeObj[type]} ON collectionId = ${typeObj[type]}.${type+"Id"} WHERE userEmail = ?`,
            values: [userEmail]
        });
        return Response.json(BizResult.success(result, '查询成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
