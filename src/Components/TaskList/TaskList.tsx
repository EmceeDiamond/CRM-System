import { List } from "antd"
import { Task } from "../Task/Task"
import styles from './TaskList.module.css'
import { useSelector } from "react-redux"
import { RootState } from "../../ReduxStore/store"
import { FilterStatus } from "../../Types/Interfase"

type PropsTaskList = {
    getData: (value: FilterStatus) => void
}

const TaskList = (props: PropsTaskList) => {

    const selectorTest = useSelector((state: RootState) => state.task)
    
    return (
        <List
            className={styles.task__list}
            dataSource={selectorTest.taskList}
            style={{display: "block"}}
            renderItem={(item) => (
                <List.Item className={styles.task} style={{display: "block"}}>
                    <Task task={item} updateState={() => props.getData(selectorTest.taskStatus)}/>
                </List.Item>
            )}>
        </List>
    )
}

export default TaskList