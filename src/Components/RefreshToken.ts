import { postRefreshToken } from "../API/userApi"
import { setAccessToken } from "./AccessToken";
import {toggleAuthenticated} from '../ReduxStore/authSlice'
import { Token } from "../Types/Interfase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../ReduxStore/store";
import { useEffect } from "react";


export const useRefreshAccessToken = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const init = async () => {
            try {
                const data: Token = await postRefreshToken(localStorage.getItem('refreshKey') || "");
                if (data !== undefined) {
                    localStorage.setItem('refreshKey', data.refreshToken)
                    setAccessToken(data.accessToken)
                    dispatch(toggleAuthenticated(true))
                }
                else {
                    dispatch(toggleAuthenticated(false))
                }
                
            } catch(err) {
                console.log(err)
            }
        }
        init();
    }, [dispatch])
    

}