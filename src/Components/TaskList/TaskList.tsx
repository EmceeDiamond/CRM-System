import { List } from "antd"
import { Task } from "../Task/Task"
import styles from './TaskList.module.css'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../ReduxStore/store"
import { getTaskList } from "../../ReduxStore/Authorization/Slices/taskSlice"
import { useEffect } from "react"

const TaskList = () => {

    const selectorTest = useSelector((state: RootState) => state.task)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

        const interval = setInterval(() => {dispatch(getTaskList(selectorTest.taskStatus))}, 5000);
        
        return () => {
            clearInterval(interval);
        };
    }, [selectorTest.taskStatus, dispatch])
    
    return (
        <List
            className={styles.task__list}
            dataSource={selectorTest.taskList.data?.data !== undefined ? selectorTest.taskList.data.data : []}
            style={{display: "block"}}
            renderItem={(item) => (
                <List.Item className={styles.task} style={{display: "block"}}>
                    <Task task={item} />
                </List.Item>
            )}>
        </List>
    )
}

export default TaskList