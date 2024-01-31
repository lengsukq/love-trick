import executeQuery from "@/app/utils/db";

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
        return e
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
        return e
    }
}

// 获取任务详情
export async function getTaskDetail(taskId) {
    try {
        return await executeQuery({
            query: 'SELECT * FROM tasklist WHERE taskId = ?',
            values: [taskId]
        });
    } catch (e) {
        console.log(e)
        return e
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
        return e
    }
}
// 获取留言列表
export async function getWhisper(eMail,searchWords='') {
    try {
        return await executeQuery({
            query: `SELECT * FROM whisper_list WHERE publisherEmail = ? AND giftName LIKE ? ORDER BY whisperId DESC`,
            values: [eMail,`%${searchWords}%`]
        });
    } catch (e) {
        console.log(e)
        return e
    }
}
