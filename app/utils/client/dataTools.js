// 非空校验
export function isInvalidFn(key, regex) {
    if (typeof key === 'string') {
        if (regex) {
            return !regex.test(key);
        } else {
            return key === "";
        }
    } else if (typeof key === 'object' && key !== null) {
        return Object.values(key).includes("");
    }
}
// 输入数字校验为0或正整数
 export function numberInvalidFn(key) {
    if (key === "") return true;
    const validateNumber = (key) => key.toString().match(/^[0-9]*$/);
    return !validateNumber(key);
}
// 邮箱校验
export function eMailInvalidFn(key) {
    if (key === "") return true;
    const validateEmail = (key) => key.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    return !validateEmail(key);
}

// 相同校验
export function sameInvalidFn(key, key2) {
    if (key === "") return true;
    return key !== key2;
}

// 快速设置本地缓存-对象  对象名，属性名，新值
export function setLocalData(objName, AttName, value) {
    const data = JSON.parse(localStorage.getItem(objName));
    data[AttName] = value;
    localStorage.setItem(objName, JSON.stringify(data));
}

// 快速获取本地缓存
export function getLocalData(objName, AttName) {
    return JSON.parse(localStorage.getItem(objName))[AttName]
}
