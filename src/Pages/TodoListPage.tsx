import  { useState, useEffect } from 'react'
import { Todo, TodoInfo, MetaResponse } from '../Types/Interfase'
import styles from './TodoListPage.module.css'
import { getTodosData } from '../API/fetch'
import TaskList from '../Components/TaskList/TaskList'
import Filter from '../Components/Filter/Filter'
import AddTask from '../Components/AddTask/AddTask'
import { FilterStatus } from '.././Types/Interfase'

function TodoListPage() {
    const [tasksList, setTasksList] = useState<Todo[]>([])
    const [taskStatus, setTaskStatus] = useState<TodoInfo>({ 
        all: 0,
        completed: 0,
        inWork: 0,
    })
    const [completionStatus, setCompletionStatus] = useState<FilterStatus>(FilterStatus.all);

    const getData = async(completionStatus: FilterStatus) => {
        try {
            const todosData: MetaResponse<Todo, TodoInfo> = await getTodosData(completionStatus);
            setTasksList(todosData.data);
            if (todosData.info !== undefined) {
                setTaskStatus(todosData.info);
            }
            
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData(completionStatus)
    }, [completionStatus]);

    return (
    <div className={styles.main}>
        <AddTask getData={() => getData(completionStatus)}/>
        <Filter 
            completionStatus={completionStatus} 
            setCompletionStatus={setCompletionStatus} 
            taskStatus={taskStatus}
        />
        <TaskList 
            tasksList={tasksList}
            getData={() => getData(completionStatus)}
            completionStatus={completionStatus}
        />
    </div>
    )
}

export default TodoListPage
