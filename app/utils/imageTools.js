// 上传图片到SM图床
export async function upImgBySM(file) {
    const formData = new FormData();
    formData.append('smfile', file);
    formData.append('format', 'json');
    try {
        const response = await fetch('https://sm.ms/api/v2/upload',{
            method: 'POST',
            body: formData,
            headers:{
                "Authorization": process.env.SM_TOKEN
            }});
        // return response.json();
        if (!response.ok) {
            console.log('response',response)

            return {msg:'上传失败，使用默认图片',url:'https://s2.loli.net/2024/01/08/ek3fUIuh6gPR47G.jpg'} // 返回默认图片链接
        }

        const data = await response.json();
        console.log('sm', data);
        return {msg:'上传成功',url:data.data.url}; // 返回获取到的图片链接
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return {msg:'上传失败，使用默认图片',url:'https://s2.loli.net/2024/01/08/ek3fUIuh6gPR47G.jpg'} // 返回默认图片链接
    }
}
// 上传图片到哔哩哔哩动态
export async function upImgByBilibili(file) {
    const formData = new FormData();
    formData.append('file_up', file);
    formData.append('biz', 'new_dyn');
    formData.append('category', 'daily');
    formData.append('csrf', process.env.BILIBILI_CSRF);
    console.log('formData',formData)

    try {
        const response = await fetch('https://api.bilibili.com/x/dynamic/feed/draw/upload_bfs',{
            method: 'POST',
            body: formData,
            headers:{
                "cookie":`SESSDATA=${process.env.BILIBILI_SESSDATA}`
            }});
        // return response.json();
        if (!response.ok) {
            console.log('response',response)
            return {msg:'上传失败，使用默认图片',url:'https://s2.loli.net/2024/01/08/ek3fUIuh6gPR47G.jpg'} // 返回默认图片链接
        }

        const data = await response.json();
        console.log('bilibili动态图片', data);
        return {msg:'上传成功',url:data.data.image_url}; // 返回获取到的图片链接
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return {msg:'上传失败，使用默认图片',url:'https://s2.loli.net/2024/01/08/ek3fUIuh6gPR47G.jpg'} // 返回默认图片链接

    }
}
