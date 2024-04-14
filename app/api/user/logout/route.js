import {cookieTools,} from "@/app/utils/cookieTools";
import {cookies} from "next/headers";
import BizResult from "@/app/utils/BizResult";

export async function GET(req) {
    try {
        const {userEmail} = cookieTools(req);
        cookies().delete(userEmail);
        const pastDate = new Date(Date.now() - 86400000).toUTCString();
        return Response.json(BizResult.success('','退出成功'), {
            status: 200,
            headers: {'Set-Cookie': `cookie=;Expires=${pastDate};`},
        })

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('', '系统异常'))
    }
}