import { configureStore } from '@reduxjs/toolkit'
import taskListDataStatus from "@/app/store/taskListStore";
import myGiftType from "@/app/store/myGiftStore";
export const store = configureStore({
    reducer: {
        taskListDataStatus:taskListDataStatus,
        myGiftType:myGiftType,
    },
})
