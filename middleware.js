import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import dayjs from "dayjs";
import BizResult from "@/app/utils/BizResult";
// import {parseCookie} from "@/app/utils/parseCookie"
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // console.log('request-----',request.cookies)
    if (!request.cookies.get('cookie')) {
        return Response.json(BizResult.fail('', '登录过期'))
    }
    // parseCookie(request)
    const reqCookie = JSON.parse(request.cookies.get('cookie').value);
    const cookieDate = dayjs(reqCookie.expires);
    // console.log('cookieDate----',reqCookie.expires,dayjs())
    console.log('isAfter', cookieDate.isAfter(dayjs()))
    if (cookieDate.isAfter(dayjs())) {
        return NextResponse.next()
    } else {
        return Response.json(BizResult.fail('', '登录过期'))
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
        '/api/((?!user).*)'
        // '/((?!api/user|_next/static|_next/image|favicon.ico).*)',

    ],
}