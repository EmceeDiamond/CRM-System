import  { useEffect } from 'react'
import { Todo, TodoInfo, MetaResponse } from '../../Types/Interfase'
import styles from './TodoListPage.module.css'
import { getTodosData } from '../../API/api'
import TaskList from '../../Components/TaskList/TaskList'
import Filter from '../../Components/Filter/Filter'
import AddTask from '../../Components/AddTask/AddTask'
import { FilterStatus } from '../../Types/Interfase'
import { useDispatch } from 'react-redux'
//import { postRefreshToken } from '../../API/userApi'
import { AppDispatch } from '../../ReduxStore/store'
import { taskLoading, taskReceived } from '../../ReduxStore/taskSlice'

function TodoListPage() {
    const dispatch: AppDispatch = useDispatch()

    const getData = async(completionStatus: FilterStatus) => {
        try {
            dispatch(taskLoading())
            const todosData: MetaResponse<Todo, TodoInfo> = await getTodosData(completionStatus);
            dispatch(taskReceived(todosData))
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {getData(FilterStatus.all)}, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
    <div className={styles.main}>
        <AddTask getData={(completionStatus: FilterStatus) => getData(completionStatus)} />
        <Filter />
        <TaskList getData={(completionStatus: FilterStatus) => getData(completionStatus)} />
    </div>
    )
}

export default TodoListPage
