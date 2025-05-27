import { MetaResponse, Todo, TodoInfo, TodoRequest,  FilterStatus} from "../Types/Interfase"
import instance from "./apiInstance"

const getTodosData = async(filter: FilterStatus): Promise <MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await instance({
            url: `todos`,
            params: {
                filter: filter
            },
            method: 'GET'
        })
        const data: Promise <MetaResponse<Todo, TodoInfo>> = await response.data;
        return data;
    }
    catch(err) {
        console.error(err)
        throw(err);
    }
    
}

const postNewTodo = async (title: string) => {
    const postData = {
        isDone: false,
        title: title
    }
    try {
        const response = await instance({
            url: 'todos',
            method: 'POST',
            data: postData,
        })
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
        const response = await instance({
            url: `/todos/${id}`,
            method: 'DELETE'
        })
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
        const response = await instance({
            url: `todos/${todo.id}`,
            method: 'PUT',
            data: todo
        })
        if (!response) {
            throw new Error ()
        }
        
    }
    catch {
        console.error('Failed Put Request')
    }
}

export {getTodosData, postNewTodo, deleteTodo, putTodo}