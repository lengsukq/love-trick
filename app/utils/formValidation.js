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
