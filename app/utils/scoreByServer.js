import executeQuery from "@/app/utils/db";

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
// 获取积分
export async function getScore(userEmail) {
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: "SELECT score FROM userinfo WHERE userEmail = ?",
            values: [userEmail]
        });
        console.log('getScore', result)
        return result;
    } catch (e) {
        console.log(e)
        return e
    }
}

// 获取任务详情
export async function getTaskDetail(taskId) {
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'SELECT * FROM tasklist WHERE taskId = ?',
            values: [taskId]
        });
        console.log('getTaskDetail', result)
        return result;
    } catch (e) {
        console.log(e)
        return e
    }
}
// 查询礼物分数
export async function getGiftScore(giftId) {
    try {
        const result = await executeQuery({
            // 查询礼物详情
            query: 'SELECT * FROM gift_list WHERE giftId = ?',
            values: [giftId]
        });
        console.log('getGiftScore', result)
        return result;
    } catch (e) {
        console.log(e)
        return e
    }
}
