'use client'
import React from "react";
import {Button, Card, CardBody, Input, Textarea} from "@nextui-org/react";
import {isInvalidFn} from "../utils/formValidation";
import {Uploader} from "react-vant";

export default function TaskInfoCom({
                                        isPost = false, acceptanceTime = '',
                                        completeRemarks = '',
                                        completionTime = '',
                                        creationTime = "",
                                        publisherEmail = "",
                                        publisherName = "",
                                        receiverEmail = '',
                                        taskDetail = "",
                                        taskId = '',
                                        taskImage = [],
                                        taskName = "",
                                        taskReward = "",
                                        taskStatus = "未开始",
                                        defaultValue = [{url: ""}],
                                        onOpen,
                                        acceptTask
                                    }) {


    return (
        <>
            <Card className={isPost ? "hidden" : "mb-5"}>
                <CardBody className="flex justify-center">
                    <p>{taskStatus}</p>
                </CardBody>
            </Card>
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <Uploader
                        value={defaultValue}
                        deletable={false}
                        showUpload={false}
                    />
                </CardBody>
            </Card>
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <Input type="text" isDisabled
                           labelPlacement="outside"
                           label="任务名称"
                           placeholder="请输入任务名称"
                           value={taskName}
                           className="mb-5"/>
                    <Textarea
                        isDisabled
                        label="任务描述"
                        labelPlacement="outside"
                        placeholder="请输入任务描述"
                        className="mb-5"
                        value={taskDetail}
                    />
                    <Textarea
                        isDisabled
                        label="任务奖励"
                        labelPlacement="outside"
                        placeholder="请输入任务奖励"
                        className="mb-5"
                        value={taskReward}
                    />
                </CardBody>
            </Card>

            <Card className={isPost ? "hidden" : "mb-5"}>
                <CardBody className="flex justify-center items-center">
                    <Textarea
                        isInvalid={isInvalidFn(completionTime)}
                        color={isInvalidFn(completionTime) ? "danger" : "success"}
                        errorMessage={isInvalidFn(completionTime) && "请输入完成备注"}
                        isDisabled={completionTime}
                        onChange={(e) => setTCompleteRemarks(e.target.value)}
                        label="完成备注"
                        labelPlacement="outside"
                        placeholder="请输入完成备注"
                        className={acceptanceTime ? "mb-5" : "hidden"}
                        value={completeRemarks}
                    />
                    <div className="flex justify-evenly w-full">
                        <Button color="danger" className={"w-1/4"}
                                onClick={() => onOpen()}>删除</Button>
                        <Button color="primary" className={completionTime ? "hidden" : "w-1/4"}
                                onClick={() => acceptTask()}>
                            {acceptanceTime ? '完成' : '接受'}</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
