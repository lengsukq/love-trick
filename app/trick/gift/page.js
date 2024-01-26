'use client'
import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Button,
    Switch,
    useSwitch,
    VisuallyHidden
} from "@nextui-org/react";
import {OnSale} from "@/app/components/icon/OnSale";
import {OffSale} from "@/app/components/icon/OffSale";

export default function App() {
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch();
    return (
        <div className={"p-5"}>
            <Card className="">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">一次性洗碗券</h4>
                            <h5 className="text-small tracking-tight text-default-400">需要积分：10</h5>
                        </div>
                    </div>
                    <Component {...getBaseProps()}>
                        <VisuallyHidden>
                            <input {...getInputProps()} />
                        </VisuallyHidden>
                        <div
                            {...getWrapperProps()}
                            className={slots.wrapper({
                                class: [
                                    "w-8 h-8",
                                    "flex items-center justify-center",
                                    "rounded-lg bg-default-100 hover:bg-default-200",
                                ],
                            })}
                        >
                            {isSelected ? <OnSale/> : <OffSale/>}
                        </div>
                    </Component>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        亲爱的来洗碗吧
                    </p>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">库存：</p>
                        <p className=" text-default-400 text-small">10</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">已有：</p>
                        <p className="text-default-400 text-small">0</p>
                    </div>
                </CardFooter>
            </Card>
        </div>

    );
}
