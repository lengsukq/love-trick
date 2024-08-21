'use client'
import React, {useState} from "react";
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Switch} from "@nextui-org/react";
import {imgUpload} from "@/app/utils/client/fileTools";
import {UpImg} from "@/app/components/icon/upImg";
import {addGift} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";
import {isInvalidFn, numberInvalidFn} from "@/app/utils/client/dataTools";

export default function App() {

    const [giftName, setGiftName] = useState('');
    const [giftDetail, setGiftDetail] = useState('');
    const [needScore, setNeedScore] = useState(0);
    const [giftImg, setGiftImg] = useState('');
    const [remained, setRemained] = useState(10);
    const [isShow, setIsShow] = useState(true);
    const [isLoading, setIsLoading ]= useState(false);
    const upGiftImg = async (event) => {
        const img = await imgUpload(event);
        setGiftImg(img);
    }
    const addGiftAct = () => {
        let params = {giftName, giftDetail, needScore,remained, isShow};
        if (isInvalidFn(params)  || numberInvalidFn(needScore) || isInvalidFn(remained)) {
            return;
        }
        setIsLoading(true);
        params['giftImg'] = giftImg;
        addGift(params).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code===200){
            setGiftName('');
            setGiftDetail('');
            setNeedScore(0);
            setGiftImg('');
            setRemained(10);
            setIsShow(true);
            setIsLoading(false);
            }
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
                                src={giftImg} className={"w-20 h-20 bg-white"}/>
                    </label>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <Input
                        isInvalid={isInvalidFn(giftName)}
                        color={isInvalidFn(giftName) ? "danger" : "success"}
                        errorMessage={isInvalidFn(giftName) && "请输入礼物名称，不超过10个字"}
                        label="礼物名称"
                        placeholder="请输入礼物名称，不超过10个字"
                        value={giftName}
                        onChange={(e) => setGiftName(e.target.value)}
                        className={"mb-5"}/>
                    <Input
                        isInvalid={isInvalidFn(giftDetail)}
                        color={isInvalidFn(giftDetail) ? "danger" : "success"}
                        errorMessage={isInvalidFn(giftDetail) && "请输入礼物描述，不超过20个字"}
                        label="礼物描述"
                        placeholder="请输入礼物描述，不超过20个字"
                        value={giftDetail}
                        onChange={(e) => setGiftDetail(e.target.value)}
                        className={"mb-5"}/>
                    <div className="flex w-full">
                        <Input
                            isInvalid={numberInvalidFn(needScore)}
                            color={numberInvalidFn(needScore) ? "danger" : "success"}
                            errorMessage={numberInvalidFn(needScore) && "积分不得小于0"}
                            value={needScore}
                            onChange={(e) => setNeedScore(e.target.value)}
                            type="number"
                            label="所需积分"
                            placeholder="请输入积分"
                            className={"mr-5"}/>
                        <Input
                            isInvalid={numberInvalidFn(remained)}
                            color={numberInvalidFn(remained) ? "danger" : "success"}
                            errorMessage={numberInvalidFn(remained) && "库存不得小于0"}
                            value={remained}
                            onChange={(e) => setRemained(e.target.value)}
                            type="number"
                            label="礼物库存"
                            placeholder="请输入库存"/>
                    </div>
                </CardBody>
                <CardFooter className="gap-3">
                    <Switch isSelected={isShow} onValueChange={(e) => setIsShow(e)}>
                        是否立即上架
                    </Switch>
                </CardFooter>
            </Card>
            <Card className={"w-full mb-5"}>
                <CardBody>
                    <div className={"flex justify-center"}>
                        <Button color="primary" className={"w-1/4"} onClick={addGiftAct} isLoading={isLoading}>
                            发布
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>

    );
}
