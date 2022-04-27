import { NextResponse } from 'next/server';
import { env } from 'process';

const _middleware = (request) => {


    const tokenCookie = request.cookies
    const url = request.nextUrl.clone()

    if (url.pathname === '/controlDocumentos') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }
    if (url.pathname === '/usuarios') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }
    if (url.pathname === '/documento') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (url.pathname === '/registrar') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (url.pathname === '/editardocumento') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (url.pathname === '/editarusuario') {
        if (tokenCookie.tokenWhitFuncion === undefined) {
            return NextResponse.redirect('/')
            // url.pathname = '/'
            // return NextResponse.rewrite(new URL('/', request.url))
        }
        return NextResponse.next()
    }

}

export default _middleware