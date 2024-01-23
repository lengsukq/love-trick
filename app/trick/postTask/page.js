'use client'

import React, {useState} from "react";
import {Button, Card, CardBody} from "@nextui-org/react";
import {postTask, uploadImages} from "@/app/utils/apihttp";
import {Notify} from "react-vant";
import {isInvalidFn} from "@/app/utils/dataTools";
import TaskInfoCom from "@/app/components/taskInfo";

export default function postTaskPage() {
    const [taskName, setTaskName] = useState('');
    const [taskDetail, setTaskDetail] = useState('');
    const [taskReward, setTaskReward] = useState('');
    const [vantImgData, setVantImgData] = useState([]);
    const readAndUploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // 定义文件读取完成时的回调函数
            reader.onload = async function (event) {
                const base64String = event.target.result.split(',')[1]; // 获取 base64 字符串部分
                const base64 = `data:${file.type};base64,${base64String}`;
                console.log('base64', base64)
                try {
                    const res = await uploadImages({file: file, base64: base64});
                    console.log('uploadImages', res.data);
                    const url = res.data.url;
                    resolve({url: url});
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
            // 如果使用b站视频封面上传请取消注释下面的代码，并注释下面获取url的代码
            // const {url} = await readAndUploadFile(file);
            let url;
            await uploadImages({file: file, base64: ""}).then(res => {
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
        console.log('imgUploadChange', v);
        setVantImgData(vantImgData.filter(item => item !== v.url))
    }
    const pushTask = () => {
        // console.log('vantImgData',vantImgData)
        // return
        let params = {
            taskName: taskName,
            taskDetail: taskDetail,
            taskReward: taskReward,
            taskScore: taskScore,
        }
        if (isInvalidFn(params)) {
            return;
        }
        params["taskImage"] = vantImgData.toString()

        console.log('taskName', taskName, 'taskReward', taskReward);
        postTask(params).then(res => {
            console.log('res', res)
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
        })
    }

    const [taskScore ,setTaskScore ]= useState(0)
    const onChangeEnd = (value) => {
        console.log('onChangeEnd',value);
        setTaskScore(value)
    }
    return (
        <div className="p-5">
            <TaskInfoCom vantUpload={vantUpload}
                         imgUploadDelete={imgUploadDelete}
                         isPost={true}
                         taskName={taskName}
                         taskDetail={taskDetail}
                         setTaskName={setTaskName}
                         taskReward={taskReward}
                         setTaskReward={setTaskReward}
                         setTaskDetail={setTaskDetail}
                         onChangeEnd={onChangeEnd}
            >
            </TaskInfoCom>
            <Card className={"w-full mb-5"}>
                <CardBody>
                    <div className={"flex justify-center"}>
                        <Button color="primary" className={"w-1/4"} onClick={pushTask}>
                            发布
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>

    );
}
