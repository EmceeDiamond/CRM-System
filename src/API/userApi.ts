
import { getAccessToken } from "../Components/AccessToken"
import {instanceAuth} from "./apiInstance"

type PropsDataNewUser = { 
    email: string,
    login: string,
    password: string,
    phoneNumber: string,
    username: string
}

type PropsDataUser = {
    login: string,
    password: string,
}

const postRegisterNewUser = async (dataNewUser: PropsDataNewUser) => {
    try {
        const response = await instanceAuth({
            url: 'auth/signup',
            method: 'POST',
            data: dataNewUser,
        })

        if (!response){
            throw new Error ()
        }

        return response.status
    }
    catch(err) {
        console.error(err);
    }
}

const postAuthenticateUser = async (dataUser: PropsDataUser) => {
    try {
        const response = await instanceAuth({
            url: 'auth/signin',
            method: 'POST',
            data: dataUser,
        })
        return response.data
    }
    catch(err) {
        console.error(err);
    }
}

const postLogoutUser = async () => {
    try {
        const response = await instanceAuth({
            url: 'user/logout',
            method: 'POST',
            headers: {
                'Authorization': `${getAccessToken()}`
            }
        },)
        if (!response){
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Post Request');
    }
}

const postRefreshToken = async (refresh: string) => {
    try {
        const response = await instanceAuth({
            url: 'auth/refresh',
            method: 'POST',
            data: {refreshToken: refresh}
        })
        return response.data
    }
    catch(err) {
        console.error(err)
        console.error('Failed Post Request');
    }
}

const getUserProfile = async () => {
    try {
        const response = await instanceAuth({
            url: 'user/profile',
            method: 'GET',
            headers: {
                'Authorization': `${getAccessToken()}`
            }
        })
        return response.data
    }
    catch{
        console.error('Failed Get Request');
    }
}

export {postRegisterNewUser, postAuthenticateUser, postLogoutUser, postRefreshToken, getUserProfile}