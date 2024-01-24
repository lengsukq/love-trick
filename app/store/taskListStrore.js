import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: '未开始',
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
    },
})

export const {setNotStart,setAccept,setComplete,setPass} = statusSlice.actions

export default statusSlice.reducer
