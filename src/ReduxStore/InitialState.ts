import { TaskState, FilterStatus, isAuthenticatedStatus, AuthState, Todo } from "../Types/Interfase"
import { initAsyncParticle } from "./Utils";

export const initialStateTaskSlice: TaskState = {
    taskList: initAsyncParticle<Todo[]>(undefined),
    taskStatus: FilterStatus.all,
    taskCountsByStatus: {
        all: 0,
        completed: 0, 
        inWork: 0,
    }
}

export const initialStateAuthSlice: AuthState = {
    isAuthenticated: false,
    isAuthenticatedStatus: isAuthenticatedStatus.initializing
};