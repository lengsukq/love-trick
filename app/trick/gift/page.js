'use client'
import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
} from "@nextui-org/react";
import {getMyGift} from "@/app/utils/client/apihttp";

export default function App() {

    useEffect(()=>{
        getTaskList().then(r=>{})
    },[])
    const [giftListData,setGiftListData] = useState([])
    const getTaskList = async (isShow = '', words = '') => {
        await getMyGift({
            isShow: isShow,
            searchWords: words
        }).then(res => {
            setGiftListData(res.code === 200 ? res.data : []);
        })
    }
    return (
        <div className={"p-5"}>
            {giftListData.map((item, index) => (
                <Card className="mb-5" key={index}>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" src={item.giftImg} />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.giftName}</h4>
                                <h5 className="text-small tracking-tight text-default-400">需要积分：{item.needScore}</h5>
                            </div>
                        </div>

                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                        <p>
                            {item.giftDetail}
                        </p>
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">库存：</p>
                            <p className=" text-default-400 text-small">{item.remained}</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">已售：</p>
                            <p className="text-default-400 text-small">{item.redeemed}</p>
                        </div>
                    </CardFooter>
                </Card>
            ))}

        </div>

    );
}
