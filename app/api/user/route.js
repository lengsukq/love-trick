import BizResult from '@/app/utils/BizResult';
import executeQuery from "@/app/utils/db";

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const username = searchParams.get('username')
    const password = searchParams.get('password')
    console.log('searchParams', searchParams,'username---',username,'password---',password)

    try {
        const result = await executeQuery({
            // 查询有无此用户
            query: 'SELECT * FROM userinfo WHERE username = ? AND password = ?',
            values: [username, password]
        });
        console.log("result", result);
        if (result.length>0){
            return Response.json(BizResult.success(result,'登录成功'))
        }else{
            return Response.json(BizResult.fail(result,'请检查用户名密码'))
        }

    } catch (error) {
        console.log(error);
        return Response.json(BizResult.fail('','系统异常'))
    }
}