'use client'
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import {getTask} from "@/app/utils/client/apihttp";
import {useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {SearchModal} from "@/app/components/searchModal";
import {closeSearch} from "@/app/store/taskListStore";

export default function App() {
    const taskStatusStore = useSelector((state) => state.taskListDataStatus.status);
    const isSearch = useSelector((state) => state.taskListDataStatus.isSearch);
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState([])
    const [searchWords, setSearchWords] = useState([])

    const router = useRouter()
    useEffect(() => {
        setSearchWords('');
        getTaskList(taskStatusStore, '').then(r => {
            console.log('useEffect', r)
        });

    }, [taskStatusStore])
    const keyToFalse = () => {
        dispatch(closeSearch())
    }
    const onKeyDown = async (e) => {
        console.log('onKeyDown', e.keyCode)
        if (e.keyCode === 13) {
            await getTaskList()
        }
    }
    const getTaskList = async (taskStatus = taskStatusStore, words = searchWords) => {
        await getTask({
            taskStatus: taskStatus,
            searchWords: words
        }).then(res => {
            dispatch(closeSearch());
            setTaskList(res.code === 200 ? res.data : []);
        })
    }

    const onPressHandler = (item) => {
        console.log("item pressed", item);
        router.push(`/trick/taskInfo?taskId=${item.taskId}`)
    }
    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
            <SearchModal openKey={isSearch}
                         keyToFalse={keyToFalse}
                         searchWords={searchWords}
                         setSearchWords={setSearchWords}
                         onKeyDown={onKeyDown}/>
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
