'use client'
import React from "react";
import {Card, CardBody, Input, Textarea} from "@nextui-org/react";
import {isInvalidFn} from "../utils/formValidation";
import {Uploader} from "react-vant";

export default function TaskInfoCom({
                                        isPost = false,
                                        taskDetail = "",
                                        taskName = "",
                                        taskReward = "",
                                        taskStatus = "未开始",
                                        defaultValue = [{url: ""}],
                                        vantUpload = () => {},
                                        imgUploadDelete = () => {},
                                        setTaskName = () => {},
                                        setTaskReward = () => {},
                                        setTaskDetail = () => {},
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
                    {isPost ? <Uploader
                            upload={vantUpload}
                            resultType={'dataUrl'}
                            onDelete={imgUploadDelete}/>
                        : <Uploader
                            value={defaultValue}
                            deletable={false}
                            showUpload={false}
                        />}
                </CardBody>
            </Card>
            <Card className="mb-5">
                <CardBody>

                    <Input isDisabled={!isPost}
                           isInvalid={isPost?isInvalidFn(taskName):false}
                           color={isPost?(isInvalidFn(taskName) ? "danger" : "success"):"default"}
                           errorMessage={isPost?isInvalidFn(taskName) && "请输入任务名称":""}
                           type="text" label="任务名称" placeholder="请输入任务名称"
                           value={taskName} className="mb-5"
                           onChange={(e) => setTaskName(e.target.value)}/>
                    <Textarea isDisabled={!isPost}
                              isInvalid={isPost?isInvalidFn(taskDetail):false}
                              color={isPost?(isInvalidFn(taskDetail) ? "danger" : "success"):"default"}
                              errorMessage={isPost?isInvalidFn(taskDetail) && "请输入任务描述":""}
                              value={taskDetail}
                              onChange={(e) => setTaskDetail(e.target.value)}
                              label="发布任务"
                              placeholder="请输入任务描述"
                              className="mb-5"
                    />
                    <Textarea isDisabled={!isPost}
                              isInvalid={isPost?isInvalidFn(taskReward):false}
                              color={isPost?(isInvalidFn(taskReward) ? "danger" : "success"):"default"}
                              errorMessage={isPost?isInvalidFn(taskReward) && "请输入任务奖励":""}
                              value={taskReward}
                              onChange={(e) => setTaskReward(e.target.value)}
                              label="任务奖励"
                              placeholder="请输入任务奖励"
                              className="mb-5"
                    />
                </CardBody>
            </Card>
        </>
    );
}
