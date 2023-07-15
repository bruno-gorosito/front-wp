
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";




export function middleware(req: NextRequest) {
    if (!req.cookies.get('x-access-token')) {
        console.log('olla')
        return NextResponse.redirect(new URL('/login', req.url))
    }
}


export const config = {
    matcher: ['/songs/edit/:id*', '/add-song']
}
