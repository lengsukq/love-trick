export function parseCookie(request) {
    // const reqCookie = JSON.parse(request.cookies.get('cookie').value);
    // console.log('parseCookie---',reqCookie)
    return JSON.parse(request.cookies.get('cookie').value)
}