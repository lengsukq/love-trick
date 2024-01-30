import BizResult from "@/app/utils/BizResult";
import {upImgMain} from "@/app/utils/imageTools";

export async function POST(req) {
    try {
        //multipart/form-data;
        const formData = await req.formData();
        const file = formData.get('file');
        const base64 = formData.get('base64');
        const fileData = {file, base64}
        // console.log('图片上传接口',fileData)
        const {msg, url} = await upImgMain(fileData);
        return Response.json(BizResult.success({url: url}, msg))
    } catch (err) {
        console.log('err', err)
        return Response.json(BizResult.fail("图片上传失败"))

    }
}
