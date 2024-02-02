'use client'
import React, {useEffect, useState} from "react";
import WhisperForm from "@/app/components/whisperForm";
import {addFav, getTAWhisper} from "@/app/utils/client/apihttp";
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
    const addFavAct = async (item) => {
        console.log('addFavAct')
        await addFav({id: item.whisperId, type: 'whisper'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getTAWhisperAct().then(r => '');
            }
        })
    }
    if (whisperData.length > 0) {
        return (
            <div className={"p-5"}>
                {whisperData.map(item => (
                    <WhisperForm key={item.whisperId} item={item} addFavAct={addFavAct}/>
                ))}
            </div>
        );
    } else {
        return (
            <NoDataCom/>
            )
    }

}
