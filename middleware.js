'use server'
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import dayjs from "dayjs";
import BizResult from "@/app/utils/BizResult";
export function middleware(request) {
    // console.log('request.url',request.url)
    // return  NextResponse.redirect(new URL('/', request.url))
    if (!request.cookies.get('cookie')) {
        return Response.json(BizResult.fail('', '登录过期'))
    }
    const reqCookie = JSON.parse(request.cookies.get('cookie').value);
    const cookieDate = dayjs(reqCookie.expires);

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
        '/api/((?!user).*)',
        '/api/userInfo'
        // '/((?!api/user|_next/static|_next/image|favicon.ico).*)',

    ],
}
