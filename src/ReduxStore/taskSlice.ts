import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterStatus, TodoRequest} from "../Types/Interfase";
import { TaskState } from "../Types/Interfase";

const initialState: TaskState = {
    loading: 'idle',
    taskList: [],
    taskStatus: FilterStatus.all,
    taskCountsByStatus: {
        all: 0,
        completed: 0, 
        inWork: 0,
    }
}

const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        taskLoading: (state) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },

        taskReceived: (state, action) => {
            if (state.loading === "pending") {
                state.taskList = action.payload.data
                state.taskCountsByStatus = action.payload.info
                state.loading = 'idle'
            }
        },

        changeTaskListStatus: (state, action) => {
            console.log(action.payload)
            state.taskStatus = action.payload
            console.log(state.taskStatus)
        },

        addTask: (state, action) => {
            const newTask = {
                isDone: false,
                title: action.payload,
                id: state.taskList.length + 1,
                created: ''
            }
            state.taskList.push(newTask)
        },

        changeTaskStatus: (state, action: PayloadAction<{isDone: boolean, id: number}>) => {
            const oldTask = state.taskList.find((task) => task.id === action.payload.id) 
            if (oldTask) {
                oldTask.isDone = action.payload.isDone
            }
        },

        changeTask: (state, action: PayloadAction<TodoRequest>) => {
            const oldTask = state.taskList.find((task) => task.id === action.payload.id);
            if (oldTask) {
                oldTask.isDone = action.payload.isDone || false;
                oldTask.title = action.payload.title || "";
            }
        }
    }
})

export const { taskLoading, taskReceived, changeTaskListStatus, addTask, changeTaskStatus, changeTask } = taskSlice.actions;

export default taskSlice.reducer