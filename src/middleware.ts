
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";




export function middleware(req: NextRequest) {
    console.log(req.nextUrl.pathname)
    


    if (req.nextUrl.pathname !== '/login' && !req.cookies.get('x-access-token')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (req.nextUrl.pathname === '/login' &&  req.cookies.get('x-access-token')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()

    

    // if (req.cookies.get('x-access-token')) {
    //     console.log('first')
        
    //     if (req.nextUrl.pathname == '/login') {
    //         return NextResponse.redirect(new URL('/', req.url))
    //     }
    // }

    

    return NextResponse.redirect(req.url)
}


export const config = {
    matcher: ['/songs/edit/:id*', '/add-song', '/login']
}
