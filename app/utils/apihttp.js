import qs from "qs";
const { stringify } = qs;
import {get, post, deleteAct} from "./fetchUtil";



// 登录接口
export async function loginApi(params) {
    return await get(`/api/user?username=${params.username}&password=${params.password}`);
}

// 获取用户信息
export async function getUserInfo() {
    return await get(`/api/userInfo`);
}
// 默认application/json
export async function postTask(params) {
    return post(`/api/trick/postTask`, JSON.stringify(params));
}

// 获取任务列表
export async function getTask() {
    return await get(`/api/trick/getTask`);
}

// 获取任务详情
export async function getTaskInfo(params) {
    return await get(`/api/trick/taskInfo?taskId=${params.taskId}`);
}

// 接受或取消
export async function upDateTaskState(params) {
    return await post(`/api/trick/taskInfo`, JSON.stringify(params));
}

export async function deleteTask(params) {
    return await deleteAct(`/api/trick/taskInfo?taskId=${params.taskId}`);
}
