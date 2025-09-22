export interface TodoRequest { 
	id: number;
	title?: string;
	isDone?: boolean; 
} 


export interface Todo { 
	id: number;
	title: string;
	created: string; 
	isDone: boolean; 
}

export interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}

export enum FilterStatus {
    all = 'all',
    completed = 'completed',
    inWork = 'inWork'
}

export interface TaskState {
    loading: string,
    taskList: Todo[],
    taskStatus: FilterStatus,
    taskCountsByStatus: TodoInfo
}

export type Token = {
    accessToken: string,
    refreshToken: string
}

type Role = "ADMIN" | "USER" | "MODERATOR"

export interface Profile { 
    id: number; 
    username: string; 
    email: string; 
    date: string; 
    isBlocked: boolean; 
    roles: Role[]; 
    phoneNumber: string; 
}

export interface AuthState {
    isAuthenticated: boolean;
    isAuthenticatedStatus: string
}

export enum isAuthenticatedStatus {
    initializing = 'initializing',
    authenticated = 'authenticated'
}