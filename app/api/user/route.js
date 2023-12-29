import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";

export async function GET(req) {
    let info = null;
    try {
        console.log("req nom", req.body)
        const result = await executeQuery({
            query: 'select * from user'
        });
        info = result;
        console.log("ttt", result);
    } catch (error) {
        console.log(error);
        info = error;
    }
    return Response.json(BizResult.success(info))
}