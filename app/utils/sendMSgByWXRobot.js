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
