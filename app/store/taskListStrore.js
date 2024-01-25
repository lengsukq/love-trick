import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: '未开始',
    isSearch:false,
}
export const statusSlice = createSlice({
    name: 'taskListStatus',
    initialState,
    reducers: {
        setNotStart: (state) => {
            state.status = "未开始";
        },
        setAccept: (state) => {
            state.status = "已接受";
        },
        setComplete: (state) => {
            state.status = "待核验";
        },
        setPass :(state) => {
            state.status = "已核验";
        },
        openSearch:(state)=>{
            console.log('true')
            state.isSearch = true;
        },
        closeSearch:(state)=>{
            state.isSearch = false;
        }
    },
})

export const {setNotStart,setAccept,setComplete,setPass,openSearch,closeSearch} = statusSlice.actions

export default statusSlice.reducer
