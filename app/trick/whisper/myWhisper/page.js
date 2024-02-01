'use client'
import React, {useEffect, useState} from "react";
import WhisperForm from "@/app/components/whisperForm";
import {getMyWhisper} from "@/app/utils/client/apihttp";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const [whisperData, setWhisperData] = useState([])
    useEffect(() => {
        getMyWhisperAct().then(r => '');
    }, [])
    const getMyWhisperAct = async () => {
        await getMyWhisper({searchWords: ""}).then(res => {
            console.log('getMyWhisper', res)
            setWhisperData(res.data)
        })
    }
    if (whisperData.length > 0) {
        return (
            <div className={"p-5"}>
                {whisperData.map(item => (
                    <WhisperForm key={item.whisperId} item={item}/>
                ))}
            </div>
        );
    } else {
        return (
            <NoDataCom/>
        )
    }

}
