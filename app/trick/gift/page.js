'use client'
import React, {useEffect, useState} from "react";
import {getMyGift, showGift} from "@/app/utils/client/apihttp";
import GiftList from "@/app/components/giftList";
import {Notify} from "react-vant";

export default function App() {

    useEffect(() => {
        getTaskList().then(r => {
        })
    }, [])
    const [giftListData, setGiftListData] = useState([])
    const getTaskList = async (isShow = '', words = '') => {
        await getMyGift({
            isShow: isShow,
            searchWords: words
        }).then(res => {
            setGiftListData(res.code === 200 ? res.data : []);
        })
    }
    const buttonAction = async (item,theKey) => {
            await showGift({giftId: item.giftId,isShow:theKey?'1':'0'}).then(res => {
                Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
                getTaskList();

            })

    }

    return (
        <GiftList giftListData={giftListData} listType={"checkGift"} buttonAction={buttonAction}></GiftList>
    );
}
