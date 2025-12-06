import { instanceAuth } from "./apiInstance";
import { MetaResponseUser, User, UserFilters, UserRequest, UserRolesRequest } from "../Types/types";

const getUsersByAdmin = async (filter: UserFilters): Promise <MetaResponseUser<User>> => {
    try {
        const response = await instanceAuth({
            url: 'admin/users',
            method: 'GET',
            params: {
                search: filter.search,
                sortBy: filter.sortBy,
                sortOrder: filter.sortOrder,
                isBlocked: filter.isBlocked,
                limit: filter.limit,
                page: filter.page
            }
        })
        const data: MetaResponseUser<User> = await response.data;
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const getUserProfileByAdmin = async (id: number): Promise <User> => {
    try {
        const response = await instanceAuth({
            url: `admin/users/${id}`,
            method: 'GET',

        })
        const data: User = await response.data;
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const updateUsersProfileByAdmin = async (id: number, userChangeableData: UserRequest): Promise <MetaResponseUser<User>> => {
    try {
        const response = await instanceAuth({
            url: `admin/users/${id}`,
            method: 'PUT',
            data: userChangeableData
        })
        const data: MetaResponseUser<User> = await response.data;
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const deleteUserByAdmin = async (id: number): Promise <void> => {
    try {
        await instanceAuth({
            url: `admin/users/${id}`,
            method: 'DELETE',
        })
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const blockUserByAdmin = async (id: number): Promise <void> => {
    try {
        await instanceAuth({
            url: `admin/users/${id}/block`,
            method: 'POST',
        })
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const updateUsersRightsByAdmin = async (id: number, role: UserRolesRequest): Promise <MetaResponseUser<User>> => {
    try {
        const response = await instanceAuth({
            url: `admin/users/${id}/rights`,
            method: 'POST',
            data: role
        })
        const data: MetaResponseUser<User> = await response.data;
        return data;
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const unblockUserByAdmin = async (id: number): Promise <MetaResponseUser<User>> => {
    try {
        const response = await instanceAuth({
            url: `admin/users/${id}/unblock`,
            method: 'POST',
        })
        const data: MetaResponseUser<User> = await response.data;
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

export { getUsersByAdmin, getUserProfileByAdmin, updateUsersProfileByAdmin, deleteUserByAdmin, blockUserByAdmin, updateUsersRightsByAdmin, unblockUserByAdmin }