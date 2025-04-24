import { Todo } from "../../Types/Interfase"
import { Task } from "../Task/Task"
import './TaskList.css'

type PropsTaskList = {
    tasksList: Todo[] | undefined,
    getData: () => void,
    completionStatus: string
}

const TaskList = (props: PropsTaskList) => {

    return (
        <div className="task__list">
            {props.tasksList?.map((item: Todo) => {
            if (props.completionStatus === "All") {
                return <Task task={item} updateState={props.getData}/>
            }
            else if (item.isDone === JSON.parse(props.completionStatus)) {
                return <Task task={item} updateState={props.getData}/>
            } 
            })}
        </div>
    )
}

export default TaskList