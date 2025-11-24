import { instanceAuth } from "./apiInstance";
import { tokenManager } from "../shared/AccessToken";
import { MetaResponseUser, User, UserFilters, UserRequest, UserRolesRequest } from "../Types/Interfase";

const getUsersByAdmin = async (filter: UserFilters): Promise <MetaResponseUser<User>> => {
    try {
        const response = await instanceAuth({
            url: 'admin/users',
            method: 'GET',
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            },
            params: {
                search: filter.search,
                sortBy: filter.sortBy,
                sortOrder: filter.sortOrder,
                isBlocked: filter.isBlocked,
                limit: filter.limit,
                page: filter.page
            }
        })
        const data: Promise <MetaResponseUser<User>> = await response.data;
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
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            }
        })
        const data: Promise <User> = await response.data;
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
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            },
            data: userChangeableData
        })
        const data: Promise <MetaResponseUser<User>> = await response.data;
        console.log(response.status, response.data)
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const deleteUserByAdmin = async (id: number) => {
    try {
        await instanceAuth({
            url: `admin/users/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            }
        })
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

const blockUserByAdmin = async (id: number) => {
    try {
        const response = await instanceAuth({
            url: `admin/users/${id}/block`,
            method: 'POST',
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            }
        })
        console.log(response.status, response.data)
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
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            },
            data: role
        })
        const data: Promise <MetaResponseUser<User>> = await response.data;
        console.log(response.status, response.data)
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
            headers: {
                'Authorization': `${tokenManager.getAccessToken()}`
            }
        })
        console.log(response.status)
        const data: Promise <MetaResponseUser<User>> = await response.data;
        return data;
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

export { getUsersByAdmin, getUserProfileByAdmin, updateUsersProfileByAdmin, deleteUserByAdmin, blockUserByAdmin, updateUsersRightsByAdmin, unblockUserByAdmin }