'use client'
import React, {useEffect, useState} from "react";
import {getMyGift, showGift, useGift} from "@/app/utils/client/apihttp";
import GiftList from "@/app/components/giftList";
import {Notify} from "react-vant";
import {useDispatch, useSelector} from "react-redux";
import SearchModal from "@/app/components/searchModal";
import {closeSearch} from "@/app/store/myGiftStore";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const myGiftType = useSelector((state) => state.myGiftType.type);
    const isSearch = useSelector((state) => state.myGiftType.isSearch);
    const dispatch = useDispatch();
    const [searchWords, setSearchWords] = useState([])
    const [listType, setListType] = useState('')
    const keyToFalse = () => {
        dispatch(closeSearch())
    }

    const typeObj = {
        "已上架": "checkGift",
        "已下架": "checkGift",
        "待使用": "useGift",
        "已用完": "overGift",
    }

    useEffect(() => {
        setSearchWords('');
        setListType(typeObj[myGiftType])
        getGiftList(myGiftType, '').then(r => {
        })
    }, [myGiftType])
    const [giftListData, setGiftListData] = useState([])
    const getGiftList = async (type = myGiftType, words = searchWords) => {
        await getMyGift({
            type: myGiftType,
            searchWords: words
        }).then(res => {
            setGiftListData(res.code === 200 ? res.data : []);
        })
    }
    const buttonAction = async (item, theKey) => {
        if (myGiftType==='待使用'){
            await useGift({giftId: item.giftId}).then(res => {
                Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
                getGiftList();
            })
        }else{
            await showGift({giftId: item.giftId, isShow: theKey ? '1' : '0'}).then(res => {
                Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
                getGiftList();
            })
        }


    }

    const onKeyDown = async (e) => {
        console.log('onKeyDown', e.keyCode)
        if (e.keyCode === 13) {
            await getGiftList()
        }
    }
    return (
        <>
            <SearchModal openKey={isSearch}
                         keyToFalse={keyToFalse}
                         searchWords={searchWords}
                         setSearchWords={setSearchWords}
                         onKeyDown={onKeyDown}
                         placeholder={"请输入礼物名称"}/>
            {giftListData.length>0?<GiftList giftListData={giftListData} listType={listType} buttonAction={buttonAction}></GiftList>:<NoDataCom/>}

        </>

    );
}
