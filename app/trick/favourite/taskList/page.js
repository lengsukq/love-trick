'use client'
import React, {useEffect, useState} from "react";
import {getFav} from "@/app/utils/client/apihttp";
import TaskCard from "@/app/components/taskCard";
import {useRouter} from "next/navigation";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const router = useRouter()
    const [taskList, setTaskList] = useState([])
    const getFavAct = () => {
        getFav({type: "task"}).then(res => {
            setTaskList(res.data)
        })
    }
    useEffect(() => {
        getFavAct();
    }, [])
    const checkDetails = (item) => {
        console.log("item pressed", item);
        router.push(`/trick/taskInfo?taskId=${item.taskId}`)
    }
    if (taskList.length > 0) {
        return (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
                <TaskCard taskList={taskList} checkDetails={checkDetails}/>
            </div>
        );
    }
    return (<NoDataCom/>)

}
