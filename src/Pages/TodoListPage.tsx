import  { useState, useEffect } from 'react'
import { Todo, TodoInfo, MetaResponse } from '../Types/Interfase'
import './TodoListPage.css'
import { fetchGet } from '../API/fetch'
//import {Task} from '../Components/Task/Task'
import TaskList from '../Components/TaskList/TaskList'
import Filter from '../Components/Filter/Filter'
import AddTask from '../Components/AddTask/AddTask'

function TodoListPage() {
    const [tasksList, setTasksList] = useState<Todo[] | undefined>([])
    const [taskStatus, setTaskStatus] = useState<TodoInfo>()
    const [completionStatus, setCompletionStatus] = useState("All");

    const getData = () => {
        fetchGet().then((data: MetaResponse<Todo, TodoInfo> | undefined)  => {
        setTasksList(data?.data)
        setTaskStatus(data?.info)
        })
    }

    useEffect(() => {
        getData()
    }, []);

    return (
    <div className="main">
        <AddTask getData={getData}/>
        <Filter 
            completionStatus={completionStatus} 
            setCompletionStatus={setCompletionStatus} 
            taskStatus={taskStatus}
        />
        <TaskList 
            tasksList={tasksList}
            getData={getData}
            completionStatus={completionStatus}
        />
    </div>
    )
}

export default TodoListPage
