import axios from "axios"; 
import { tokenManager } from "../shared/AccessToken";

const instance = axios.create({
    baseURL : 'https://easydev.club/api/v1/',
    headers: {
        'Content-Type': "application/json",
    }
});

const instanceAuth = axios.create({
    baseURL : 'https://easydev.club/api/v1/',
    headers: {
        'Content-Type': "application/json",
        'Authorization': `${tokenManager.getAccessToken()}`
    }
});

export {instanceAuth, instance};