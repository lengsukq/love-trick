'use client'
import React, {useEffect, useState} from "react";
import GiftList from "@/app/components/giftList";
import {addFav, getFav} from "@/app/utils/client/apihttp";
import WhisperForm from "@/app/components/whisperForm";
import NoDataCom from "@/app/components/noDataCom";
import {Notify} from "react-vant";

export default function App() {
    const [whisperData, setWhisperData] = useState([])
    const getFavAct =() => {
        getFav({type:"whisper"}).then(res=>{
            setWhisperData(res.data)
        })
    }
    const addFavAct = async (item) => {
        console.log('addFavAct')
        await addFav({id: item.whisperId, type: 'whisper'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getFavAct();
            }
        })
    }
    useEffect(() => {
        getFavAct();
    }, [])
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
