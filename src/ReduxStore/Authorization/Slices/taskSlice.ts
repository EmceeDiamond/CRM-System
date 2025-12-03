import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterStatus, TodoRequest} from "../../../Types/types";
import { initialStateTaskSlice } from "../../InitialState";
import { getTodosData } from "../../../API/api";
import { addAsyncBuilderCases } from "../../Utils";

export const getTaskList = createAsyncThunk(
    'todos',
    async (filter: FilterStatus) => {
        const response = await getTodosData(filter)
        return response
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState: initialStateTaskSlice,
    reducers: {
        changeTaskListStatus: (state, action) => {
            state.taskStatus = action.payload
        },

        changeTaskStatus: (state, action: PayloadAction<{isDone: boolean, id: number}>) => {
            const oldTask = state.taskList.data?.data.find((task) => task.id === action.payload.id) 
            if (oldTask) {
                oldTask.isDone = action.payload.isDone
            }
        },

        changeTask: (state, action: PayloadAction<TodoRequest>) => {
            const oldTask = state.taskList.data?.data.find((task) => task.id === action.payload.id);
            if (oldTask) {
                oldTask.isDone = action.payload.isDone || false;
                oldTask.title = action.payload.title || "";
            }
        }
    },

    extraReducers: (builder) => {
        addAsyncBuilderCases(builder, getTaskList, 'taskList')
    }
    })

export const { changeTaskListStatus, changeTaskStatus, changeTask } = taskSlice.actions;
export default taskSlice.reducer