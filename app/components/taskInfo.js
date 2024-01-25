'use client'
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Input, Slider, Textarea} from "@nextui-org/react";
import {isInvalidFn} from "../utils/dataTools";
import {Uploader} from "react-vant";
import {TrashCan} from "@/app/components/icon/trashCan";
import {getScore} from "@/app/utils/apihttp";

export default function TaskInfoCom({
                                        isPost = false,
                                        taskDetail = "",
                                        taskName = "",
                                        taskReward = "",
                                        taskScore = 0,
                                        taskStatus = "未开始",
                                        defaultValue = [{url: ""}],
                                        vantUpload = () => "",
                                        imgUploadDelete = () => "",
                                        setTaskName = () => "",
                                        setTaskReward = () => "",
                                        setTaskDetail = () => "",
                                        deleteButton = () => "",
                                        onChangeEnd = () => "",
                                    }) {
    const getScoreAct = async () => {
        await getScore().then(res => {
            setSliderMax(res.data.score)
        })
    }
    const [sliderMax, setSliderMax] = useState(1000)
    const [sliderValue, setSliderValue] = useState(0)
    useEffect(() => {
        if (isPost) {
            // 获取积分
            getScoreAct().then(r =>{})
        } else {
            setSliderMax(taskScore)
        }
        console.log('useEffect')
        setSliderValue(taskScore)
    }, [taskScore])


    return (
        <>
            <Card className={isPost ? "hidden" : "mb-5"}>
                <CardBody className="flex justify-between flex-row items-center">
                    <p>{taskStatus}</p>
                    <Button isIconOnly variant="faded" onClick={() => deleteButton()}>
                        <TrashCan></TrashCan>
                    </Button>
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
                           isInvalid={isPost ? isInvalidFn(taskName) : false}
                           color={isPost ? (isInvalidFn(taskName) ? "danger" : "success") : "default"}
                           errorMessage={isPost ? isInvalidFn(taskName) && "请输入任务名称" : ""}
                           type="text" label="任务名称" placeholder="请输入任务名称"
                           value={taskName} className="mb-5"
                           onChange={(e) => setTaskName(e.target.value)}/>
                    <Textarea isDisabled={!isPost}
                              isInvalid={isPost ? isInvalidFn(taskDetail) : false}
                              color={isPost ? (isInvalidFn(taskDetail) ? "danger" : "success") : "default"}
                              errorMessage={isPost ? isInvalidFn(taskDetail) && "请输入任务描述" : ""}
                              value={taskDetail}
                              onChange={(e) => setTaskDetail(e.target.value)}
                              label="任务描述"
                              placeholder="请输入任务描述"
                              className="mb-5"
                    />
                    <Textarea isDisabled={!isPost}
                              isInvalid={isPost ? isInvalidFn(taskReward) : false}
                              color={isPost ? (isInvalidFn(taskReward) ? "danger" : "success") : "default"}
                              errorMessage={isPost ? isInvalidFn(taskReward) && "请输入任务奖励" : ""}
                              value={taskReward}
                              onChange={(e) => setTaskReward(e.target.value)}
                              label="任务奖励"
                              placeholder="请输入任务奖励"
                              className="mb-5"
                    />
                    <Slider
                        isDisabled={!isPost}
                        label="悬赏积分"
                        step={5}
                        maxValue={sliderMax}
                        minValue={0}
                        getValue={(donuts) => `❤️${donuts}`}
                        value={sliderValue}
                        className="max-w-md"
                        onChange={setSliderValue}
                        onChangeEnd={onChangeEnd}
                    />
                </CardBody>
            </Card>
        </>
    );
}
