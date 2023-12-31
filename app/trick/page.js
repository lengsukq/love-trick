'use client'
import React from "react";
import {useEffect, useState} from 'react'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {getTask} from "@/app/utils/apihttp";

// async function getTaskList() {
//     await getTask().then(res => {
//         console.log('getTaskList', res.data);
//         return res.data;
//     })
// }

export default function App() {
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        getTaskList().then(r => {
            console.log('useEffect', r)
        });
    }, [])
    // const taskList = await getTaskList();
    const getTaskList = async () => {
        await getTask().then(res => {
            console.log('getTaskList', res.data);
            setTaskList(res.data);
        })
    }

    const onPressHandler = () => {
        console.log("item pressed")
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
            {taskList.map((item, index) => (
                <Card shadow="sm" key={index} isPressable>
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
                        <b>{item.taskName}</b>
                        <p className="text-default-500">{item.publisherName}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
