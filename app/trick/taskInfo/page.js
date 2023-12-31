'use client'
import React, {useEffect, useState} from "react";
import {Input, Textarea} from "@nextui-org/react";
import {getTaskInfo} from "@/app/utils/apihttp";
import {usePathname, useSearchParams} from 'next/navigation'

export default function App() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [taskInfo, setTaskInfo] = useState({})

    useEffect(() => {
        getTaskInfoAct(searchParams.get('taskId')).then(r => {
        });
        console.log('searchParams', searchParams.get('taskId'), pathname)
    }, [])
    const getTaskInfoAct = async (taskId) => {
        await getTaskInfo({taskId: taskId}).then(res => {
            console.log('getTaskInfo', res.data);
            setTaskInfo(res.data)
        })
    }
    return (
        <div className="p-5">
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
        </div>

    );
}
