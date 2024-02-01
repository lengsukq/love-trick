'use client'
import React, {useEffect, useState} from "react";
import {WhisperForm} from "@/app/components/whisperForm";
import {getTAWhisper} from "@/app/utils/client/apihttp";

export default function App() {
    const [whisperData, setWhisperData] = useState([])
    useEffect(() => {
        getTAWhisperAct().then(r => '');
    }, [])
    const getTAWhisperAct = async () => {
        await getTAWhisper({searchWords: ""}).then(res => {
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

    }

}
