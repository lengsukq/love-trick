'use client'
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Input, Textarea} from "@nextui-org/react";
import {getTaskInfo, upDateTaskState} from "@/app/utils/apihttp";
import {usePathname, useSearchParams} from 'next/navigation'
import {Notify} from "react-vant";


export default function App() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [taskInfo, setTaskInfo] = useState({})
    const [completeRemarks, setTCompleteRemarks] = useState('')

    useEffect(() => {
        getTaskInfoAct(searchParams.get('taskId')).then(r => {
        });
        console.log('searchParams', searchParams.get('taskId'), pathname)
    }, [])
    const getTaskInfoAct = async (taskId) => {
        await getTaskInfo({taskId: taskId}).then(res => {
            console.log('getTaskInfo', res.data);
            setTaskInfo(res.data);
            setTCompleteRemarks(res.data.completeRemarks)
        })
    }
    const acceptTask = () => {
        let params = {
            actType: taskInfo.acceptanceTime ? "complete" : 'accept',
            taskId: taskInfo.taskId,
        };
        if (completeRemarks) {
            params['completeRemarks'] = completeRemarks
        }

        upDateTaskState(params).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getTaskInfoAct(taskInfo.taskId).then(r => {
                });
            }
        })
    }
    return (
        <div className="p-5">
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <p>{taskInfo.taskStatus}</p>
                </CardBody>
            </Card>
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <Input type="text" isDisabled
                           labelPlacement="outside"
                           label="任务名称"
                           placeholder="请输入任务名称"
                           value={taskInfo.taskName}
                           className="mb-5"/>
                    <Textarea
                        isDisabled
                        label="任务描述"
                        labelPlacement="outside"
                        placeholder="请输入任务描述"
                        className="mb-5"
                        value={taskInfo.taskDetail}
                    />
                    <Textarea
                        isDisabled
                        label="任务奖励"
                        labelPlacement="outside"
                        placeholder="请输入任务奖励"
                        className="mb-5"
                        value={taskInfo.taskReward}
                    />
                </CardBody>
            </Card>

            <Card className="mb-5">
                <CardBody className="flex justify-center items-center">
                        <Textarea
                            isDisabled={taskInfo.completionTime}
                            onChange={(e) => setTCompleteRemarks(e.target.value)}
                            label="完成备注"
                            labelPlacement="outside"
                            placeholder="请输入完成备注"
                            className={taskInfo.acceptanceTime ? "mb-5" : "hidden"}
                            value={completeRemarks}
                        />

                    <Button color="primary" className={taskInfo.completionTime ? "hidden" : "w-1/4"}
                            onClick={() => acceptTask()}>
                        {taskInfo.acceptanceTime ? '完成' : '接受'}</Button>


                </CardBody>
            </Card>
        </div>

    );
}
