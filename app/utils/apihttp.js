import requestFun from "./fetchUtil"; //引入
import qs from "qs";

const { stringify } = qs;
const { post, get } = requestFun;
// 登录接口
export async function loginApi(params) {
    return get(`/api/user?username=${params.username}&password=${params.password}`);
}

// 默认application/json
export async function postTask(params) {
    return post(`/api/trick/postTask`, JSON.stringify(params));
}