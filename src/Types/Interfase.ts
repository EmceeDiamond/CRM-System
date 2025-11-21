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
    taskList: IAsyncParticle<AsyncTaskData>;
    taskStatus: FilterStatus;
    taskCountsByStatus: TodoInfo | undefined;
}

export interface AsyncTaskData {
    data: Todo[],
    info: TodoInfo
}

export type Token = {
    accessToken: string;
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

export type NewUser = {
    email: string,
    login: string,
    password: string,
    phoneNumber: string,
    username: string
}

export type dataAuthenticateUser = {
    login: string,
    password: string,
    rememberUser: boolean
}

export interface AuthState {
    isAuthenticated: boolean;
    isAuthenticatedStatus: string,
    refresh: boolean
}

export enum isAuthenticatedStatus {
    initializing = 'initializing',
    authenticated = 'authenticated'
}

export interface IAsyncParticle<T> {
    data: T | undefined;
    error: unknown | undefined;
    errorCounter: number;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

export interface IAsyncState {
    [key: string]: IAsyncParticle<unknown>;
}

export interface IAsyncDataStatus {
    hasError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isLoadingOrIdle: boolean;
    isLoaded: boolean;
    isLoadedOrError: boolean;
}

export interface IErrorData {
    message: string;
    code?: number | string;
    details?: unknown;
}

export type PropsDataNewUser = { 
    email: string,
    login: string,
    password: string,
    phoneNumber: string,
    username: string
}

export type PropsDataUser = {
    login: string,
    password: string,
}

export interface UserFilters { 
	search?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	isBlocked?: boolean;
	limit?: number;
	page?: number;
}

export interface User {
	id: number;
	username: string;
	email: string;
	date: string; 
	isBlocked: boolean;
	roles: Roles[]; 
	phoneNumber: string;
}

export interface MetaResponseUser<T> { 
	data: T[]
	meta: {   
		totalAmount: number;   
		sortBy: string;   
		sortOrder: 'asc' | 'desc'; 
	}
}

export interface UserRolesRequest {  
	roles: Roles []
}

export interface UserRequest{  
	username?: string; 
	email?: string; 
	phoneNumber?: string;
}

export enum Roles {
	ADMIN = "ADMIN",
	MODERATOR = "MODERATOR",
	USER = "USER"
}