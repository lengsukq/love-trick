'use client'
import React, {useEffect, useState} from "react";
import {addFav, exchangeGift, getGiftList} from "@/app/utils/client/apihttp";
import GiftList from "@/app/components/giftList";
import {Notify} from "react-vant";
import {closeSearch} from "@/app/store/myGiftStore";
import {useDispatch} from "react-redux";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        getGiftListAct().then(r => {
        })
    }, [])
    const [giftListData, setGiftListData] = useState([]);

    const getGiftListAct = async (isShow = '', words = '') => {
        await getGiftList({
            isShow: isShow,
            searchWords: words
        }).then(res => {
            dispatch(closeSearch());
            setGiftListData(res.code === 200 ? res.data : []);
        })
    }

    const buttonAction = async (item, theKey) => {
        console.log('buttonAction', item, theKey)

        if (theKey) {
            setLoading(true);

            await exchangeGift({giftId: item.giftId}).then(res => {
                Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
                getGiftListAct();
                setLoading(false);

            })
        }
    }
    const addFavAct = async (item) => {
        setLoading(true)
        await addFav({id: item.giftId, type: 'gift'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getTaskList().then(r => {
                })
            }
            setLoading(false)
        })
    }


    return giftListData.length > 0 ? (

        <GiftList giftListData={giftListData}
                  listType={"getGift"}
                  buttonAction={buttonAction}
                  addFavAct={addFavAct}
                  isLoading={isLoading}/>
    ) : <NoDataCom/>
}
