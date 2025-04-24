import { MetaResponse, Todo, TodoInfo } from "../Types/Interfase"

const fetchGet = async() => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos`);
        const data: Promise <MetaResponse<Todo, TodoInfo>> = await response.json();
        return data
    }
    catch {
        console.error('Failed Get Request')
    }
    
}

const fetchPost = async (isDone: boolean, title: string) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos`, {
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

const fetchDelete = async (id: number)=> {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error ()
        }
    }
    catch {
        console.error('Failed Delet Request')
    }
}

const fetchPut = async (isDone: boolean, title: string, id: number) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                isDone: isDone,
                title: title,
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

export {fetchGet, fetchPost, fetchDelete, fetchPut}