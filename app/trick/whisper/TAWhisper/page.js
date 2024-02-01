'use client'
import React, {useEffect, useState} from "react";
import WhisperForm from "@/app/components/whisperForm";
import {getTAWhisper} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const [whisperData, setWhisperData] = useState([])
    useEffect(() => {
        getTAWhisperAct().then(r => '');
    }, [])
    const getTAWhisperAct = async () => {
        try {
            await getTAWhisper({searchWords: ""}).then(res => {
                if (res.code===200){
                    setWhisperData(res.data)
                }else{
                    Notify.show({type: 'warning', message: `${res.msg}`})
                }
            })
        }catch (e){
            console.log(e);
        }

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
