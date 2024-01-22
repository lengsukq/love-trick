'use client'
import React from "react";
import {useEffect, useState} from 'react'
import {Card, CardBody, CardFooter, Image, CardHeader} from "@nextui-org/react";
import {getTask} from "@/app/utils/apihttp";
import {useRouter} from 'next/navigation'

export default function App() {
    const [taskList, setTaskList] = useState([])
    const router = useRouter()
    useEffect(() => {
        getTaskList().then(r => {
            console.log('useEffect', r)
        });
        // console.log('router', pathname)
    }, [])
    // const taskList = await getTaskList();
    const getTaskList = async () => {
        await getTask().then(res => {
            console.log('getTaskList', res.data);

            setTaskList(res.code===200?res.data:[]);
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
