import { instanceAuth, instance } from "./apiInstance"
import { PropsDataNewUser, PropsDataUser, Token, User } from "../Types/types"
//import { tokenManager } from "../shared/AccessToken"

const registerNewUser = async (dataNewUser: PropsDataNewUser): Promise <User> => {
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

const authenticateUser = async (dataUser: PropsDataUser): Promise <Token> => {
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

const logoutUser = async (): Promise <void> => {
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

const refreshToken = async (refresh: string): Promise <Token> => {
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

const getProfile = async (): Promise <User> => {
    try {
        const response = await instanceAuth({
            url: 'user/profile',
            method: 'GET'
        })
        return response.data
    }
    catch (err){
        console.error('Failed Get Request');
        throw err;
    }
}

export {registerNewUser, authenticateUser, logoutUser, refreshToken, getProfile }