'use client'
import React, {useEffect, useState} from "react";
import {getUserInfo} from "@/app/utils/apihttp";
import {Card, CardBody, CardFooter, Button, CardHeader, Avatar, Chip} from "@nextui-org/react";

import {User} from "@nextui-org/react";
import {Divider} from "react-vant";

export default function App() {
    const [userInfo, setUserInfo] = useState({
        avatar: "",
        describeByself: "",
        lover: "",
        password: "",
        registrationTime: "",
        userEmail: "",
        userId: 0,
        username: ""
    })
    const [isFollowed, setIsFollowed] = React.useState(false);
    useEffect(() => {
        getUserInfoAct().then(r => {
        });
    }, [])
    const getUserInfoAct = async () => {
        await getUserInfo().then(res => {
            console.log('getTaskList', res.data);
            setUserInfo(res.data ? res.data : {});
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
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className=" text-default-400 text-small">注册时间：</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="text-default-400 text-small">{userInfo.registrationTime}</p>
                    </div>
                </CardFooter>
            </Card>
            <Card className="">
                <CardBody className="overflow-visible py-2">
                    <div className="max-w-md mt-3 mb-3">
                        <div className="flex items-center space-x-4 text-large justify-evenly">
                            <div><Chip radius="lg" color="default" variant="dot">近频</Chip></div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div><Chip radius="lg" color="success" variant="dot">同频</Chip></div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div><Chip radius="lg" color="warning" variant="dot">错频</Chip></div>
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
