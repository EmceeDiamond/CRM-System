import { instanceAuth, instance } from "./apiInstance"
import { PropsDataNewUser, PropsDataUser } from "../Types/types"

const registerNewUser = async (dataNewUser: PropsDataNewUser) => {
    try {
        const response = await instance({
            url: 'auth/signup',
            method: 'POST',
            data: dataNewUser,
        })
        return response.data
    }
    catch(err) {
        console.error(err);
        throw err
    }
}

const authenticateUser = async (dataUser: PropsDataUser) => {
    try {
        const response = await instance({
            url: 'auth/signin',
            method: 'POST',
            data: dataUser,
        })
        return response.data
    }
    catch(err) {
        console.error(err);
        throw err
    }
}

const logoutUser = async () => {
    try {
        const response = await instanceAuth({
            url: 'user/logout',
            method: 'POST',
        },)
        if (!response){
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Post Request');
    }
}

const refreshToken = async (refresh: string) => {
    try {
        const response = await instance({
            url: 'auth/refresh',
            method: 'POST',
            data: {refreshToken: refresh}
        })
        return response.data
    }
    catch(err) {
        console.error('Failed Post Request');
        throw err
    }
}

const getUserProfile = async () => {
    try {
        const response = await instanceAuth({
            url: 'user/profile',
            method: 'GET'
        })
        if (response){
            return response.data
        }
        
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

export {registerNewUser, authenticateUser, logoutUser, refreshToken, getUserProfile }