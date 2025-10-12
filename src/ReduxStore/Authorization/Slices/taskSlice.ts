import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterStatus, TodoRequest} from "../../../Types/Interfase";
import { initialStateTaskSlice } from "../../InitialState";
import { getTodosData } from "../../../API/api";
//import { addAsyncBuilderCases } from "../../Utils";

export const getTaskList = createAsyncThunk(
    'todos',
    async (filter: FilterStatus) => {
        console.log("Start AsyncThunk", filter)
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

        addTask: (state, action) => {
            const newTask = {
                isDone: false,
                title: action.payload,
                id: (state.taskList.data?.length ?? 0) + 1,
                created: ''
            }
            state.taskList.data?.push(newTask)
        },

        changeTaskStatus: (state, action: PayloadAction<{isDone: boolean, id: number}>) => {
            const oldTask = state.taskList.data?.find((task) => task.id === action.payload.id) 
            if (oldTask) {
                oldTask.isDone = action.payload.isDone
            }
        },

        changeTask: (state, action: PayloadAction<TodoRequest>) => {
            const oldTask = state.taskList.data?.find((task) => task.id === action.payload.id);
            if (oldTask) {
                oldTask.isDone = action.payload.isDone || false;
                oldTask.title = action.payload.title || "";
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getTaskList.pending, (state) => {
            state.taskList.status = 'pending';
        });
        builder.addCase(getTaskList.fulfilled, (state, action) => {
            state.taskList.status = 'fulfilled';
            state.taskList.errorCounter = 0;
            state.taskList.data = action.payload.data;
            state.taskCountsByStatus = action.payload.info
        });
        builder.addCase(getTaskList.rejected, (state, action) => {
            state.taskList.error = action.payload;
            state.taskList.errorCounter = (state.taskList.errorCounter ?? 0) + 1;
            state.taskList.status = 'rejected';
        });
            console.log("start extraReducer")
        }
    })

export const { changeTaskListStatus, addTask, changeTaskStatus, changeTask } = taskSlice.actions;
export default taskSlice.reducer