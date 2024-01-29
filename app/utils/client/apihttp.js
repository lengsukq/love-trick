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
// 默认application/json，发布任务
export async function postTask(params) {
    return post(`/api/trick/postTask`, params);
}

// 获取任务列表
export async function getTask(params) {
    return await get(`/api/trick/getTaskList?taskStatus=${params.taskStatus}&searchWords=${params.searchWords}`);
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
// 更新用户信息
export async function updateUserInfo(params) {
    return await post(`/api/userInfo`, params);
}
// 获取积分余额
export async function getScore() {
    return await get(`/api/userInfo/score`);
}
// 默认application/json，发布礼物信息
export async function addGift(params) {
    return post(`/api/gift/addGift`, params);
}
// 获取我的礼物列表
export async function getMyGift(params) {
    return await get(`/api/gift/getMyGift?isShow=${params.isShow}&searchWords=${params.searchWords}`);
}
