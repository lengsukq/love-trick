import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    type: '已上架',
    isSearch:false,
}
export const statusSlice = createSlice({
    name: 'myGiftType',
    initialState,
    reducers: {
        setAll: (state) => {
            state.type = "";
        },
        setUp: (state) => {
            state.type = "已上架";
        },
        setDown: (state) => {
            state.type = "已下架";
        },
        setUse :(state) => {
            state.type = "待使用";
        },
        setUsed :(state) => {
            state.type = "已用完";
        },
        openSearch:(state)=>{
            state.isSearch = true;
        },
        closeSearch:(state)=>{
            state.isSearch = false;
        }
    },
})

export const {setAll,setUp,setDown,setUse,setUsed,openSearch,closeSearch} = statusSlice.actions

export default statusSlice.reducer
