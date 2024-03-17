'use client'
import React, {useEffect, useState} from "react";
import WhisperForm from "@/app/components/whisperForm";
import {addFav, getMyWhisper} from "@/app/utils/client/apihttp";
import NoDataCom from "@/app/components/noDataCom";
import {Notify} from "react-vant";

export default function App() {
    const [whisperData, setWhisperData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getMyWhisperAct().then(r => '');
    }, [])
    const getMyWhisperAct = async () => {
        await getMyWhisper({searchWords: ""}).then(res => {
            console.log('getMyWhisper', res)
            setWhisperData(res.data)
        })
    }
    const addFavAct = async (item) => {
        console.log('addFavAct')
        setIsLoading(true);
        await addFav({id: item.whisperId, type: 'whisper'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getMyWhisperAct().then(r => '');
            }
            setIsLoading(false);

        })
    }
    if (whisperData.length > 0) {
        return (
            <div className={"p-5"}>
                {whisperData.map(item => (
                    <WhisperForm key={item.whisperId} item={item} addFavAct={addFavAct} addLoading={isLoading}/>
                ))}
            </div>
        );
    } else {
        return (
            <NoDataCom/>
        )
    }

}
