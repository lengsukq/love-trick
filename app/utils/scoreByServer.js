import executeQuery from "@/app/utils/db";

export async function addScore(value, userEmail) {
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'UPDATE userinfo SET score = score + ? WHERE userEmail = ?',
            values: [value,userEmail]
        });
    } catch (e) {

    }
}
export async function subtractScore(value, userEmail) {
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: 'UPDATE userinfo SET score = score - ? WHERE userEmail = ?',
            values: [value,userEmail]
        });

        return await getScore(userEmail);
    } catch (e) {
        return e
    }
}
export async function getScore( userEmail) {
    try {
        const result = await executeQuery({
            // 查询任务列表
            query: "SELECT score FROM userinfo WHERE userEmail = ?",
            values: [userEmail]
        });
        console.log('getScore',result)
        return  result;
    } catch (e) {

    }
}
