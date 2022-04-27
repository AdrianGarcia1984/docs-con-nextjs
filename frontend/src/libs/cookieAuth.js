import { serialize } from 'cookie'
const TOKEN_NAME = 'tokenWhitFuncion'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setTokenCookie(token) {
    document.cookie = TOKEN_NAME+'='+token//;expires+'='+MAX_AGE//;httpOnly;
   }

export function removeTokenCookie() {
    const cookie = serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    })
    document.cookie= cookie
}

export function getTokenCookie() {
    var lista =[]
    var micookie=''
    if (typeof window !== 'undefined') {
        lista=document.cookie.split(";");        
    } 
    for (var i in lista) {
        var busca = lista[i].search(TOKEN_NAME);
        if (busca > -1) {micookie=lista[i]}
        }
    var igual = micookie.indexOf("=");
    var valor = micookie.substring(igual+1);
    return valor;
}