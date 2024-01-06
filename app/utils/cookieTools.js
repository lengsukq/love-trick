export function cookieTools(request) {
    if (request.cookies.get('cookie')&&request.cookies.get('cookie').hasOwnProperty('value')){
        const cookie = JSON.parse(request.cookies.get('cookie')?.value);
        // 获取cookie基本信息
        // console.log('cookie基本信息',cookie)
        // 解密cookie的value
        console.log('解密cookie的value',decryptData(cookie.value))
        return decryptData(cookie.value)
    }else{
        return {}
    }


}
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
// 加密函数
export function encryptData(data) {
    return jwt.sign(data, secretKey);
}

// 解密函数
export function decryptData(cookie) {
    try {
        return jwt.verify(cookie, secretKey);
    } catch (err) {
        console.error('解密失败：', err);
        return null;
    }
}
