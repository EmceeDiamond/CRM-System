import { refreshToken } from "../API/userApi"
import { tokenManager } from "../shared/AccessToken";
import {toggleAuthenticated} from '../ReduxStore/Authorization/Slices/authSlice'
import { Token } from "../Types/Interfase";
import { AppDispatch } from "../ReduxStore/store";

export const REFRESH_TOKEN_KEY = 'refreshKey'

export const refreshAccessToken = async (dispatch: AppDispatch) => {
    
    try {
        const data: Token = await refreshToken(localStorage.getItem(REFRESH_TOKEN_KEY) || "");

        if (data) {
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken)
            tokenManager.setAccessToken(data.accessToken)
            dispatch(toggleAuthenticated(true))
            return true
        }
    } 
    catch(error) {
        const err = error as {status: number}

        if (err.status === 401) {
            dispatch(toggleAuthenticated(false))
        }
    }
}