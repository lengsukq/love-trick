'use server'
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import dayjs from "dayjs";
import BizResult from "@/app/utils/BizResult";

export function middleware(request) {
    try {
        const reqCookie = request.cookies.get('cookie');
        if (!reqCookie) {
            return Response.json(BizResult.fail('', '请登录后使用'))
        }
        // console.log('reqCookie',reqCookie)
        const clientCookie = JSON.parse(reqCookie.value);
        // console.log('clientCookie', clientCookie)
        const serverCookie = cookies().get(clientCookie.name);
        // console.log('serverCookie', serverCookie);
        const pastDate = new Date(Date.now() - 86400000).toUTCString();

        if (clientCookie.value !== serverCookie.value) {

            return Response.json(BizResult.fail('', '身份验证失败，请重新登录'),{
                status: 200,
                headers: {'Set-Cookie': `cookie=;Expires=${pastDate};`},
            })
        }
        const cookieDate = dayjs(clientCookie.expires);
        if (cookieDate.isAfter(dayjs())) {
            return NextResponse.next()
        } else {
            return Response.json(BizResult.fail('', '登录过期'),{
                status: 200,
                headers: {'Set-Cookie': `cookie=;Expires=${pastDate};`},
            })
        }
    }catch (e){
        console.log('中间件报错:',e);
        return Response.json(BizResult.fail(''))

    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [

        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/api/((?!user).*)',
        // '/((?!/uuuu|_next/static|_next/image|favicon.ico).*)',

    ],
}
