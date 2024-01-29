'use client'
import React, {useState} from "react";
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Switch} from "@nextui-org/react";
import {imgUpload} from "@/app/utils/client/fileTools";
import {UpImg} from "@/app/components/icon/upImg";
import {addGift} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";

export default function App() {

    const [giftName, setGiftName] = useState('');
    const [giftDetail, setGiftDetail] = useState('');
    const [needScore, setNeedScore] = useState(0);
    const [giftImg, setGiftImg] = useState('');
    const [remained,setRemained]= useState(10);
    const [isShow,setIsShow] = useState(true);
    const upGiftImg = async (event) => {
        const img = await imgUpload(event);
        setGiftImg(img);
    }
    const addGiftAct = ()=>{
        addGift({giftName, giftDetail, needScore, giftImg, remained,isShow}).then(res=>{
            console.log(res)
            Notify.show({ type: res.code ===200?'success':'warning', message: `${res.msg}` })
        })
    }
    return (
        <div className={"p-5"}>
            <Card className={"mb-5"}>
                <CardHeader className="justify-center">
                    <input type="file" name="file" className={"hidden"} id="upload"
                           onChange={upGiftImg}/>
                    <label htmlFor="upload">
                        <Avatar isBordered radius="full" icon={<UpImg size={40}/>}
                                src={giftImg} className={"w-20 h-20"}/>
                    </label>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <Input label="礼物名称"
                           placeholder="请输入礼物名称，不超过10个字"
                           value={giftName}
                           onChange={(e) => setGiftName(e.target.value)}
                           className={"mb-5"}/>
                    <Input label="礼物描述"
                           placeholder="请输入礼物描述，不超过20个字"
                           value={giftDetail}
                           onChange={(e) => setGiftDetail(e.target.value)}
                           className={"mb-5"}/>
                    <div className="flex w-full">
                        <Input value={needScore}
                               onChange={(e) => setNeedScore(e.target.value)}
                               type="number"
                               label="所需积分"
                               placeholder="请输入积分"
                               className={"mr-5"}/>
                        <Input value={remained}
                               onChange={(e) => setRemained(e.target.value)}
                               type="number"
                               label="礼物库存"
                               placeholder="请输入库存"/>
                    </div>
                </CardBody>
                <CardFooter className="gap-3">
                    <Switch isSelected={isShow} onValueChange={(e)=>setIsShow(e)}>
                        是否立即上架
                    </Switch>
                </CardFooter>
            </Card>
            <Card className={"w-full mb-5"}>
                <CardBody>
                    <div className={"flex justify-center"}>
                        <Button color="primary" className={"w-1/4"} onClick={addGiftAct}>
                            发布
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>

    );
}
