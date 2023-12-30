import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const username = searchParams.get('username')
    const password = searchParams.get('password')
    console.log('searchParams', searchParams,'username---',username,'password---',password)

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
    return Response.json(BizResult.success(info),{
        status: 200,
            headers: {'Set-Cookie': `token=1111111111111111`},
    })
}