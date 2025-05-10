import { MetaResponse, Todo, TodoInfo, TodoRequest,  FilterStatus} from "../Types/Interfase"

const BASE_URL = 'https://easydev.club/api/v1'

const getTodosData = async(filter: FilterStatus): Promise <MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${BASE_URL}/todos?filter=${filter}`);
        const data: Promise <MetaResponse<Todo, TodoInfo>> = await response.json();
        return data;
    }
    catch(err) {
        console.error(err)
        throw(err);
    }
    
}

const postTodo = async (isDone: boolean, title: string) => {
    try {
        const response = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                isDone: isDone,
                title: title,
            }),
        })
        if (!response.ok){
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Post Request');
    }
}

const deleteTodo = async (id: number)=> {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Delet Request')
    }
}

const putTodo = async (todo: TodoRequest) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                isDone: todo.isDone,
                title: todo.title,
            }),
        })
        if (!response.ok) {
            throw new Error ()
        }
        
    }
    catch {
        console.error('Failed Put Request')
    }
}

export {getTodosData, postTodo, deleteTodo, putTodo}