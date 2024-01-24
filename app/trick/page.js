'use client'
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import {getTask} from "@/app/utils/apihttp";
import {useRouter} from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'

export default function App() {
    const taskStatusStore = useSelector((state) => state.taskListDataStatus.status);
    const [taskList, setTaskList] = useState([])
    const router = useRouter()
    useEffect(() => {
        console.log('taskStatusStore',taskStatusStore)
        getTaskList().then(r => {
            console.log('useEffect', r)
        });
        // console.log('router', pathname)
    }, [taskStatusStore])
    // const taskList = await getTaskList();
    const getTaskList = async () => {
        await getTask({taskStatus:taskStatusStore}).then(res => {
            console.log('getTaskList', res.data);

            setTaskList(res.code === 200 ? res.data : []);
        })
    }

    const onPressHandler = (item) => {
        console.log("item pressed", item);
        router.push(`/trick/taskInfo?taskId=${item.taskId}`)
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
            {taskList.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => onPressHandler(item)}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className=" text-large uppercase font-bold truncate w-full">{item.taskName}</p>
                        <small className="text-default-500">{item.creationTime}</small>
                        {/*<h4 className="font-bold text-tiny ">Frontend Radio</h4>*/}
                    </CardHeader>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.taskName}
                            className="w-full object-cover h-[140px]"
                            src={item.taskImage[0]}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.publisherName}</b>
                        <p className="text-default-500">{item.taskStatus}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
