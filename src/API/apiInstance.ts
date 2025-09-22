import axios from "axios"; 

const instanceTask = axios.create({
    baseURL : 'https://easydev.club/api/v1/',
    timeout : 1000, 
    headers: {
        'Content-Type': "application/json",
    }
});

const instanceAuth = axios.create({
    baseURL : 'https://easydev.club/api/v1/',
    headers: {
        'Content-Type': "application/json",
    }
});

export {instanceTask, instanceAuth};