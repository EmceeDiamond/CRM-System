import styles from './TodoListPage.module.css'
import TaskList from '../../Components/TaskList/TaskList'
import Filter from '../../Components/Filter/Filter'
import AddTask from '../../Components/AddTask/AddTask'

function TodoListPage() {

    return (
        <div className={styles.main}>
            <AddTask />
            <Filter />
            <TaskList />
        </div>
    )
}

export default TodoListPage
