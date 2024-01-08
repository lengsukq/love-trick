import BizResult from "@/app/utils/BizResult";
import {upImgByBilibili, upImgBySM} from "@/app/utils/imageTools";

export async function POST(req) {
    //multipart/form-data;

    try {
        const formData = await req.formData();
        const file = formData.get('file');
        console.log('file', file)
        const {msg,url} = await upImgByBilibili(file);
        return Response.json(BizResult.success({url:url},msg))
    }catch (err){
        console.log('err',err)
        return Response.json(BizResult.fail("图片上传失败"))

    }
}
