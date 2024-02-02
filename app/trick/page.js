'use client'
import React, {useEffect, useState} from "react";
import {getTask} from "@/app/utils/client/apihttp";
import {useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import SearchModal from "@/app/components/searchModal";
import {closeSearch} from "@/app/store/taskListStore";
import NoDataCom from "@/app/components/noDataCom";
import TaskCard from "@/app/components/taskCard";

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

    const checkDetails = (item) => {
        console.log("item pressed", item);
        router.push(`/trick/taskInfo?taskId=${item.taskId}`)
    }
    if (taskList.length > 0) {
        return (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
                <SearchModal openKey={isSearch}
                             keyToFalse={keyToFalse}
                             searchWords={searchWords}
                             setSearchWords={setSearchWords}
                             onKeyDown={onKeyDown}/>
                    <TaskCard taskList={taskList} checkDetails={checkDetails}/>
            </div>
        );
    } else {
        return (
            <NoDataCom/>
        )
    }


}
