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
    const [vantImgBase64, setVantImgBase64] = useState([]);
    const  readAndUploadFile= (file)=> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            let base64 = "";
            let url;

            // 定义文件读取完成时的回调函数
            reader.onload = async function (event) {
                const base64String = event.target.result.split(',')[1]; // 获取 base64 字符串部分
                base64 = `data:${file.type};base64,${base64String}`;
                try {
                    const res = await uploadImages({ file: file, base64: base64 });
                    console.log('uploadImages', res.data);
                    url = res.data.url;
                    resolve({ url: url });
                } catch (error) {
                    reject(error);
                }
            };

            // 读取文件内容为 base64
            reader.readAsDataURL(file);
        });
    }

    const vantUpload = async (file) => {

        try {
            console.log('vantUpload', file)
            const {url} = await readAndUploadFile(file);
            setVantImgData([...vantImgData, url])

            return {url: url}


        } catch (error) {
            console.log('vantUpload', error)
            return {url: `demo_path/${file.name}`}
        }

    }
    const onChange = (v) => {
        console.log('onChange', v)
    }
    const imgUploadDelete = (v) => {
        // 输出被删除的那一项
        console.log('imgUploadChange', v);
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
            <Uploader upload={vantUpload} resultType={'dataUrl'} onDelete={imgUploadDelete}/>
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
