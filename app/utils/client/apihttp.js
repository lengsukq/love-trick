import {deleteAct, get, post} from "./fetchUtil";

// 登录接口
export async function loginApi(params) {
    return await get(`/api/user`,params);
}
// 退出
export async function logoutApi() {
    return await get(`/api/user/logout`);
}
// 用户注册
export async function userRegister(params) {
    return post(`/api/user`, params);
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
    return await get(`/api/trick/getTaskList`,params);
}

// 获取任务详情
export async function getTaskInfo(params) {
    return await get(`/api/trick/getTaskInfo`,params);
}

// 接受或取消
export async function upDateTaskState(params) {
    return await post(`/api/trick/getTaskInfo`, JSON.stringify(params));
}

// 删除任务
export async function deleteTask(params) {
    return await deleteAct(`/api/trick/getTaskInfo`,params);
}

// 上传图片
export async function uploadImages(params) {
    return await post(`/api/image-api`, {}, {
        type: 'FormData',
        body: params,
        headers: {}
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
    return await get(`/api/gift/getMyGift`,params);
}

// 获取我的礼物兑换列表
export async function getGiftList(params) {
    return await get(`/api/gift/getGiftList`,params);
}

// 兑换礼物
export async function exchangeGift(params) {
    return await get(`/api/gift/exchangeGift`,params);
}

// 上架，下架礼物
export async function showGift(params) {
    return await get(`/api/gift/showGift`,params);
}

// 使用礼物
export async function useGift(params) {
    return await get(`/api/gift/useGift`,params);
}
// 发布留言
export async function addWhisper(params) {
    return post(`/api/whisper/addWhisper`, params);
}
// 获取我的留言列表
export async function getMyWhisper(params) {
    return await get(`/api/whisper/getMyWhisper`,params);
}
// 获取我的留言列表
export async function getTAWhisper(params) {
    return await get(`/api/whisper/getTAWhisper`,params);
}
// 收藏/取消收藏
export async function addFav(params) {
    return post(`/api/favourite/addFav`, params);
}
// 获取收藏列表
export async function getFav(params) {
    return post(`/api/favourite/getFav`, params);
}
