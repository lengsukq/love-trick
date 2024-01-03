'use client'

import React, {useState} from "react";
import {Button, Input, Textarea} from "@nextui-org/react";
import {postTask} from "@/app/utils/apihttp";
import {Notify} from "react-vant";
export const metadata  = {
    title: '发布任务 | love-trick',
    description: 'love-trick',
}
export default function postTaskPage() {
    const [taskName, setTaskName] = useState('');
    const [taskDetail, setTaskDetail] = useState('');
    const [taskReward, setTaskReward] = useState('');
    const pushTask = () => {
        console.log('taskName', taskName, 'taskReward', taskReward);
        postTask({taskName: taskName, taskDetail: taskDetail, taskReward: taskReward}).then(res => {
            console.log('res', res)
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
        })
    }

    return (
        <div className="container flex flex-col justify-center items-center px-4 h-lvh">
            <Input type="text" label="任务名称" placeholder="请输入任务名称" value={taskName} className="mb-5"
                   onChange={(e) => setTaskName(e.target.value)}/>

            <Textarea
                value={taskDetail}
                onChange={(e) => setTaskDetail(e.target.value)}
                label="发布任务"
                placeholder="请输入任务描述"
                className="mb-5"
            />
            <Textarea
                value={taskReward}
                onChange={(e) => setTaskReward(e.target.value)}
                label="任务奖励"
                placeholder="请输入任务奖励"
                className="mb-5"
            />
            <Button color="primary" className="" onClick={pushTask}>
                发布
            </Button>
        </div>

    );
}
