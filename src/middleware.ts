import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    // const path = request.nextUrl.pathname

    // const isPublicPath = path === '/login' || path === '/signup' || path === '/' 
    // const token = request.cookies.get('token')
    // if(isPublicPath && token){
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }
    // if(!isPublicPath && !token){
    //     console.log("redirecting to login")
    //     const loginUrl = new URL('/login', request.nextUrl);
    //     loginUrl.searchParams.set('redirect', path);
    //     return NextResponse.redirect(loginUrl);    }


}
 
export const config = {
    matcher: ['/journal', '/:path*']}
