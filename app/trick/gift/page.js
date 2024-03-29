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
    const [listType, setListType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            if (res.code===200){
                setGiftListData(res.data);
                dispatch(closeSearch())
            }else{
                Notify.show({type:'warning', message: `${res.msg}`})

            }
        })
    }
    const buttonAction = async (item, theKey) => {
        setIsLoading(true);
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
        setIsLoading(false);


    }

    const onKeyDown = async () => {
            await getGiftList()
    }
    return (
        <>
            <SearchModal openKey={isSearch}
                         keyToFalse={keyToFalse}
                         searchWords={searchWords}
                         setSearchWords={setSearchWords}
                         onKeyDown={onKeyDown}
                         placeholder={"请输入礼物名称"}/>
            {giftListData.length>0?
                <GiftList giftListData={giftListData}
                          listType={listType}
                          buttonAction={buttonAction}
                          isLoading={isLoading}
                />:<NoDataCom/>}

        </>

    );
}
