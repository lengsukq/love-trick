// 上传图片
import {uploadImages} from "@/app/utils/client/apihttp";

export async function imgUpload(event) {
    const file = event.target.files[0];
    try {
        const res = await uploadImages({ file: file, base64: "" });
        console.log('uploadImages', res);

        if (res.code === 200) {
            return res.data.url;
        } else {
            throw new Error("图片上传失败: " + res.msg);
        }
    } catch (error) {
        throw new Error('图片上传失败', error)
    }

}
