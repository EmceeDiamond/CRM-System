import { TaskState, FilterStatus, isAuthenticatedStatus, AuthState, AsyncTaskData } from "../Types/Interfase"
import { initAsyncParticle } from "./Utils";

export const initialStateTaskSlice: TaskState = {
    taskList: initAsyncParticle<AsyncTaskData>(undefined),
    taskStatus: FilterStatus.all,
    taskCountsByStatus: {
        all: 0,
        completed: 0, 
        inWork: 0,
    }
}

export const initialStateAuthSlice: AuthState = {
    isAuthenticated: false,
    isAuthenticatedStatus: isAuthenticatedStatus.initializing,
    refresh: false
};