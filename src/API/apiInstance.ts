import axios from "axios"; 

const instance = axios.create({
    baseURL : 'https://easydev.club/api/v1/',
    timeout : 1000, 
    headers: {
        'Content-Type': "application/json",
    }
});

export default instance;