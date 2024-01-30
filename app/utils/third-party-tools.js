// 发送文本消息
export function sendMsg(msg) {
    fetch(process.env.WX_ROBOT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 设置头部信息
        },
        body: JSON.stringify({msgtype: "text", text: {content: msg}}), // 将对象转换为 JSON 字符串
    })
        .then(response => response.json())
        .then(data => console.log('POST 请求成功：', data))
        .catch(error => console.error('POST 请求失败：', error));
}
// 获取随机图片
export async function randomImages() {
    try {
        const response = await fetch('https://www.dmoe.cc/random.php?return=json');

        if (!response.ok) {
            return 'https://www.freeimg.cn/i/2023/12/31/659105191c747.png' // 返回默认图片链接
        }

        const data = await response.json();
        console.log('随机图片', data);
        return data.imgurl; // 返回获取到的图片链接
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'https://www.freeimg.cn/i/2023/12/31/659105191c747.png' // 返回默认图片链接
    }
}
