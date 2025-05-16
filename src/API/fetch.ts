import { MetaResponse, Todo, TodoInfo, TodoRequest,  FilterStatus} from "../Types/Interfase"
import axios from 'axios'

const BASE_URL = 'https://easydev.club/api/v1'

const getTodosData = async(filter: FilterStatus): Promise <MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await axios.get(`${BASE_URL}/todos?filter=${filter}`);
        const data: Promise <MetaResponse<Todo, TodoInfo>> = await response.data;
        return data;
    }
    catch(err) {
        console.error(err)
        throw(err);
    }
    
}

const postTodo = async (title: string) => {
    const postData = {
        isDone: false,
        title: title
    }
    try {
        const response = await axios.post(`${BASE_URL}/todos`, postData)
        if (!response){
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Post Request');
    }
}

const deleteTodo = async (id: number)=> {
    try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
        if (!response) {
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Delet Request')
    }
}

const putTodo = async (todo: TodoRequest) => {
    try {
        const response = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo)
        if (!response) {
            throw new Error ()
        }
        
    }
    catch {
        console.error('Failed Put Request')
    }
}

export {getTodosData, postTodo, deleteTodo, putTodo}