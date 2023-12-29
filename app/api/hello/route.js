import BizResult from '@/app/utils/BizResult';

export async function GET(req) {
    const {searchParams} = new URL(req.url)
    console.log('searchParams', searchParams)
    const id = searchParams.get('id')
    console.log('id', id)
    return Response.json(BizResult.success(id))
}

export async function POST(req) {
    let id = null;
    const contentType = req.headers.get('content-type');
    if (contentType === 'application/json') {
        const jsonData = await req.json();
        console.log('jsonData', jsonData)
        id = jsonData.id;
    } else {
        //multipart/form-data;
        const formData = await req.formData();
        console.log('formData', formData)
        id = formData.get('id');
    }
    // 打印 Content-Type 到控制台
    console.log('BizResult',BizResult.fail('请输入完整信息'))
    console.log('Content-Type:', contentType);
    return Response.json(BizResult.success(id), {
        status: 200,
        headers: {'Set-Cookie': `token=1111111111111111`},
    })
}
