'use client'
import React, {useEffect, useState} from "react";
import GiftList from "@/app/components/giftList";
import {addFav, getFav} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";
import NoDataCom from "@/app/components/noDataCom";

export default function App() {
    const [giftListData, setGiftListData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getFavAct =() => {
        getFav({type:"gift"}).then(res=>{
            setGiftListData(res.data)
        })
    }
    useEffect(() => {
        getFavAct();
    }, [])
    const addFavAct = async (item) => {
        setLoading(true);
        await addFav({id: item.giftId, type: 'gift'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getFavAct();
            }
            setLoading(false);
        })
    }
    if (giftListData.length>0){
        return (
            <div>
                <GiftList giftListData={giftListData} listType={'favList'} addFavAct={addFavAct} isLoading={isLoading}/>
            </div>
        );
    }else{
        return ( <NoDataCom/>)
    }


}
