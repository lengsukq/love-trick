// 非空校验
export function isInvalidFn (key,regex){
    if (typeof key === 'string'){
        if (regex){
            return !regex.test(key);
        }else{
            return key === "";
        }
    }else if (typeof key === 'object' && key !== null){
        return Object.values(key).includes("");
    }
}
// 快速设置本地缓存-对象  对象名，属性名，新值
export function setLocalData(objName,AttName,value){
    const data =  JSON.parse(localStorage.getItem(objName));
    data[AttName] = value;
    localStorage.setItem(objName,JSON.stringify(data));
}
// 快速获取本地缓存
export function getLocalData(objName,AttName){
    return JSON.parse(localStorage.getItem(objName))[AttName]
}
