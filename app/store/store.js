import { configureStore } from '@reduxjs/toolkit'
import taskListDataStatus from "@/app/store/taskListStrore";
export const store = configureStore({
    reducer: {
        taskListDataStatus:taskListDataStatus,
    },
})
