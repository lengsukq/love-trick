import React from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {FilterIco} from "@/app/components/icon/filterIco";
import {useDispatch, useSelector} from 'react-redux'
import {SearchIcon} from "@/app/components/icon/SearchICon";
import {setAll, setUp, setDown, setUse, setUsed, closeSearch, openSearch} from "@/app/store/myGiftStore";

export function MyGiftLeftDropdown() {
    const myGiftType = useSelector((state) => state.myGiftType.type);
    const [myGiftTypeKey, setMyGiftTypeKey] = React.useState(new Set([myGiftType]));
    const dispatch = useDispatch()
    const onChange = (value) => {
        console.log('onChange', value, typeof value, value === '已核验');
        const setValueObj = {
            "所有的": setAll(),
            "已上架": setUp(),
            "已下架": setDown(),
            "待使用": setUse(),
            "已用完": setUsed(),
        }
        dispatch(setValueObj[value])
    }
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant="faded">
                    <FilterIco/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions"
                          selectionMode="single"
                          disallowEmptySelection
                          onAction={onChange}
                          selectedKeys={myGiftTypeKey}
                          onSelectionChange={setMyGiftTypeKey}>
                {/*<DropdownItem key="所有的">所有的</DropdownItem>*/}
                <DropdownItem key="已上架">已上架</DropdownItem>
                <DropdownItem key="已下架">已下架</DropdownItem>
                <DropdownItem key="待使用">待使用</DropdownItem>
                <DropdownItem key="已用完">已用完</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export function MyGiftRightDropdown() {
    const isSearch = useSelector((state) => state.myGiftType.isSearch);

    const dispatch = useDispatch();
    const openSearchBtn = () => {

        if (isSearch) {
            dispatch(closeSearch())
        }else{
            dispatch(openSearch())
        }
    }
    return (
        <Button isIconOnly variant="faded" onClick={openSearchBtn}>
            <SearchIcon/>
        </Button>
    );
}
