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
    return await get(`/api/trick/getTaskList`);
}

// 获取任务详情
export async function getTaskInfo(params) {
    return await get(`/api/trick/getTaskInfo?taskId=${params.taskId}`);
}

// 接受或取消
export async function upDateTaskState(params) {
    return await post(`/api/trick/getTaskInfo`, JSON.stringify(params));
}
// 删除任务
export async function deleteTask(params) {
    return await deleteAct(`/api/trick/getTaskInfo?taskId=${params.taskId}`);
}
// 上传图片
export async function uploadImages(params) {
    return await post(`/api/image-api`,{},{
        type: 'FormData',
        body:params,
        headers: {
        }
    });
}
export async function updateUserInfo(params) {
    return await post(`/api/userInfo`, params);
}
