import qs from "qs";
const { stringify } = qs;
import {get, post} from "./fetchUtil";



// 登录接口
export async function loginApi(params) {
    return await get(`/api/user?username=${params.username}&password=${params.password}`);
}

// 默认application/json
export async function postTask(params) {
    return post(`/api/trick/postTask`, JSON.stringify(params));
}

// 获取任务列表
export async function getTask() {
    return await get(`/api/trick/getTask`);
}