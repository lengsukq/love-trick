import requestFun from "./fetchUtil"; //引入
import qs from "qs";

const { stringify } = qs;
const { post, get } = requestFun;
// 登录接口
export async function loginApi(params) {
    return get(`/api/user?username=${params.username}&password=${params.password}`);
}