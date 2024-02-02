import executeQuery from "@/app/utils/db";
import {error} from "next/dist/build/output/log";

// 添加积分
export async function addScore(value, userEmail) {
    try {
        await executeQuery({
            // 查询任务列表
            query: 'UPDATE userinfo SET score = score + ? WHERE userEmail = ?',
            values: [value, userEmail]
        });
        return await getScore(userEmail);
    } catch (e) {
        throw new error(e)
    }
}
// 扣减积分
export async function subtractScore(value, userEmail) {
    try {
        const scoreResult = await getScore(userEmail);
        const score = scoreResult[0].score;
        if (score<value){
            return {error:'积分不足，兑换失败'}
        }
        await executeQuery({
            // 查询任务列表
            query: 'UPDATE userinfo SET score = score - ? WHERE userEmail = ?',
            values: [value, userEmail]
        });

        return await getScore(userEmail);
    } catch (e) {
        console.log('subtractScore',e)
        throw new error(e)
    }
}
// 获取积分余额
export async function getScore(userEmail) {
    try {
        return await executeQuery({
            // 查询任务列表
            query: "SELECT score FROM userinfo WHERE userEmail = ?",
            values: [userEmail]
        });
    } catch (e) {
        console.log(e)
        throw new error(e)
    }
}

// 获取任务详情
export async function getTaskDetail(taskId) {
    try {
        return await executeQuery({
            query: 'SELECT tasklist.*,favourite_list.* FROM tasklist LEFT JOIN favourite_list ON collectionId = taskId WHERE taskId = ?',
            values: [taskId]
        });
    } catch (e) {
        console.log(e)
        throw new error(e)
    }
}
// 查询礼物分数
export async function getGiftScore(giftId) {
    try {
        return await executeQuery({
            // 查询礼物详情
            query: 'SELECT * FROM gift_list WHERE giftId = ?',
            values: [giftId]
        });
    } catch (e) {
        console.log(e)
        throw new error(e)
    }
}
// 获取留言列表
export async function getWhisper(eMail,searchWords='') {
    console.log('获取留言列表',eMail)
    try {
        return await executeQuery({
            query: `SELECT * FROM whisper_list WHERE publisherEmail = ? AND title LIKE ? ORDER BY whisperId DESC`,
            values: [eMail,`%${searchWords}%`]
        });
    } catch (e) {
        throw new error(e)
    }
}
