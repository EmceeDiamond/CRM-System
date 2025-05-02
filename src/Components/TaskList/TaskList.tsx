import { Todo } from "../../Types/Interfase"
import { Task } from "../Task/Task"
import styles from './TaskList.module.css'

type PropsTaskList = {
    tasksList: Todo[],
    getData: () => void,
    completionStatus: string
}

const TaskList = (props: PropsTaskList) => {

    return (
        <ul className={styles.task__list}>
            {props.tasksList.map((item: Todo) => {
                return  <li className={styles.task}>
                            <Task task={item} updateState={props.getData}/>
                        </li>
            })}
        </ul>
    )
}

export default TaskList