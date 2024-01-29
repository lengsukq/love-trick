'use client'
import React, {useEffect, useState} from "react";
import {getGiftList} from "@/app/utils/client/apihttp";
import GiftList from "@/app/components/giftList";

export default function App() {

    useEffect(() => {
        getTaskList().then(r => {
        })
    }, [])
    const [giftListData, setGiftListData] = useState([]);

    const getTaskList = async (isShow = '', words = '') => {
        await getGiftList({
            isShow: isShow,
            searchWords: words
        }).then(res => {
            setGiftListData(res.code === 200 ? res.data : []);
        })
    }
    return (
        <GiftList giftListData={giftListData} listType={"getList"}></GiftList>

    );
}
