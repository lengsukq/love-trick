'use client'

import React, {useState} from "react";
import {Button, Input, Textarea} from "@nextui-org/react";
import {postTask, uploadImages} from "@/app/utils/apihttp";
import {Notify, Uploader} from "react-vant";

export default function postTaskPage() {
    const [taskName, setTaskName] = useState('');
    const [taskDetail, setTaskDetail] = useState('');
    const [taskReward, setTaskReward] = useState('');
    const [vantImgData, setVantImgData] = useState([]);
    const vantUpload = async (file) => {
        try {
            let url;
            await uploadImages({file: file}).then(res => {
                // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
                console.log('uploadImages', res.data);
                url = res.data.url;
            });
            setVantImgData([...vantImgData, url])
            return {url: url}
        } catch (error) {
            console.log('vantUpload', error)
            return {url: `demo_path/${file.name}`}
        }

    }
    const imgUploadDelete = (v) => {
        // 输出被删除的那一项
        console.log('imgUploadChange',v);
        setVantImgData(vantImgData.filter(item => item !== v.url))
    }
    const pushTask = () => {
        // console.log('vantImgData',vantImgData)
        // return
        console.log('taskName', taskName, 'taskReward', taskReward);
        postTask({
            taskName: taskName,
            taskDetail: taskDetail,
            taskReward: taskReward,
            taskImage: vantImgData.toString()
        }).then(res => {
            console.log('res', res)
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
        })
    }

    return (
        <div className="container flex flex-col justify-center items-center px-4 h-lvh">
            <Uploader upload={vantUpload} onDelete={imgUploadDelete}/>
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
