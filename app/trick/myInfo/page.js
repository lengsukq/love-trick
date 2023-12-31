'use client'
import React, {useEffect, useState} from "react";
import {getUserInfo} from "@/app/utils/apihttp";
import {Card, CardBody, CardFooter, Button, CardHeader, Avatar} from "@nextui-org/react";

import {User} from "@nextui-org/react";
import {Divider} from "react-vant";

export default function App() {
    const [userInfo, setUserInfo] = useState([])
    const [isFollowed, setIsFollowed] = React.useState(false);
    useEffect(() => {
        getUserInfoAct().then(r => {
        });
    }, [])
    const getUserInfoAct = async () => {
        await getUserInfo().then(res => {
            console.log('getTaskList', res.data);
            setUserInfo(res.data);
        })
    }
    return (
        <div className="p-5">
            <Card className="mb-5">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={userInfo.avatar}/>
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{userInfo.username}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{userInfo.userEmail}</h5>
                        </div>
                    </div>
                    <Button
                        className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? "联结" : "断联"}
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        {userInfo.describeByself}
                    </p>
                    <span className="pt-2">
          {/*#FrontendWithZoey*/}
                        {/*<span className="py-2" aria-label="computer" role="img">*/}
                        {/*  💻*/}
                        {/*</span>*/}
        </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small"></p>
                        <p className=" text-default-400 text-small">注册时间：</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small"></p>
                        <p className="text-default-400 text-small">{userInfo.registrationTime}</p>
                    </div>
                </CardFooter>
            </Card>
            <Card className="">
                <CardBody className="overflow-visible py-2">
                    <div className="max-w-md mt-3 mb-3">

                        <div className="flex items-center space-x-4 text-large justify-evenly">
                            <div>未尽</div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div>已成</div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div>错频</div>
                        </div>
                        <Divider className="my-4"/>
                        <div className="space-y-1 flex justify-center items-center">
                            <h4 className="text-small font-thin">时光的最初，故事开始的地方。</h4>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>


    );
}
