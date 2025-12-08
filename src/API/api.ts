import { MetaResponse, Todo, TodoInfo, TodoRequest,  FilterStatus} from "../Types/types"
import { instance } from "./apiInstance"

const getTodosData = async(filter: FilterStatus): Promise <MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await instance({
            url: `todos`,
            params: {
                filter: filter
            },
            method: 'GET'
        })
        const data: MetaResponse<Todo, TodoInfo> = await response.data;
        return data;
    }
    catch(err) {
        console.error(err)
        throw(err);
    }
    
}

const addNewTodo = async (title: string): Promise <void> => {
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

const deleteTodo = async (id: number): Promise <void> => {
    try {
        await instance({
            url: `/todos/${id}`,
            method: 'DELETE'
        })
    }
    catch(err) {
        console.error(err)
    }
}

const changeTodo = async (todo: TodoRequest): Promise <void> => {
    try {
        await instance({
            url: `todos/${todo.id}`,
            method: 'PUT',
            data: todo
        })
    }
    catch(err) {
        console.error(err)
    }
}

export {getTodosData, addNewTodo, deleteTodo, changeTodo}