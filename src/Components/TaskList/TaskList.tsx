import { List } from "antd"
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
        <List
            className={styles.task__list}
            dataSource={props.tasksList}
            style={{display: "block"}}
            renderItem={(item) => (
                <List.Item className={styles.task} style={{display: "block"}}>
                    <Task task={item} updateState={props.getData}/>
                </List.Item>
            )}>
        </List>
    )
}

export default TaskList