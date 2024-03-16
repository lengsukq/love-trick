import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: '',
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
        setAll :(state) => {
            state.status = "";
        },
        openSearch:(state)=>{
            console.log('true')
            state.isSearch = true;
        },
        closeSearch:(state)=>{
            console.log('closeSearch','false')

            state.isSearch = false;
        }
    },
})

export const {setNotStart,setAccept,setComplete,setPass,setAll,openSearch,closeSearch} = statusSlice.actions

export default statusSlice.reducer
