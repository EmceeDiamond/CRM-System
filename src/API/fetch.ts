import { MetaResponse, Todo, TodoInfo } from "../Interface/Interfase"

const fetchGet = async(): Promise <MetaResponse<Todo, TodoInfo>> => {
    return await fetch(`https://easydev.club/api/v1/todos`).then((response) => {
        if (!response.ok) {
            throw new Error ()
        }
        return response.json()
    })
    .then(data => data)
    .catch((error) => console.log(error))
}

const fetchPost = async (isDone: boolean, title: string) => {
    console.log(isDone, title)
    await fetch(`https://easydev.club/api/v1/todos`, {
        method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
			isDone: isDone,
			title: title,
		}),
    }).then((response) => {
        if (!response.ok) {
            throw new Error ()
        }
    })
    .catch((error) => console.log(error))
}

const fetchDelete = async (id: number)=> {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, { method: 'DELETE' })
    .then((response) => {
        console.log("fetcheDel")
        if (!response.ok) {
            throw new Error ()
        }
    })
    .catch((error) => console.log(error))
}

const fetchPut = async (isDone: boolean, title: string, id: number) => {
    console.log(isDone, title, id)
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
			isDone: isDone,
			title: title,
		}),
    }).then((response) => {
        if (!response.ok) {
            throw new Error ()
        }
    })
    .catch((error) => console.log(error))
}

export {fetchGet, fetchPost, fetchDelete, fetchPut}