import {Avatar, Button, Card, CardBody, CardFooter, CardHeader,} from "@nextui-org/react";
import React from "react";

export const UserInfoCard = ({userInfo, onOpen,isLover=false}) => {
    if (userInfo) {
        return (
            <>
                <Card className="mb-5">
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" src={userInfo.avatar}/>
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{userInfo.username}
                                    <span className={"text-default-400"}>❤️{userInfo.score}</span></h4>

                                <h5 className="text-small tracking-tight text-default-400">{userInfo.userEmail}</h5>
                            </div>
                        </div>
                        <Button
                            className={isLover?"hidden":"bg-transparent text-foreground border-default-200"}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={"bordered"}
                            onClick={onOpen}>
                            编辑
                        </Button>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                        <p>
                            {userInfo.describeBySelf}
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
            </>
        )
    }


};

