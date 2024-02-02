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
            query: `SELECT favourite_list.*,${typeObj[type]}.*,userinfo.username AS collectionName
                    FROM favourite_list 
                    LEFT JOIN ${typeObj[type]} ON favourite_list.collectionId = ${typeObj[type]}.${type+"Id"} 
                    LEFT JOIN userinfo ON favourite_list.userEmail = userinfo.userEmail
                    WHERE favourite_list.userEmail = ? AND favourite_list.collectionType = ?
                    ORDER BY favId DESC`,
            values: [userEmail,type]
        });
        if (type === 'task'){
            result.forEach(item => {
                item.taskImage = item.taskImage.split(',');
                item["isApprove"] = item.isApprove !== 0;
            })
        }

        return Response.json(BizResult.success(result, '查询成功'))
    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}
