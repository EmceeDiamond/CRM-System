import React from "react"
import { TodoInfo } from "../../Types/Interfase"
import './Filter.css'

type PropsFilter = {
    completionStatus: string, 
    taskStatus?: TodoInfo,
    setCompletionStatus: React.Dispatch<React.SetStateAction<string>>
}

const Filter = (props: PropsFilter) => {
    return (
        <div className="filter">
            <button className={props.completionStatus === "All" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => props.setCompletionStatus("All")} autoFocus>Все({props.taskStatus?.all})</button>
            <button className={props.completionStatus === "false" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => props.setCompletionStatus("false")}>В прогрессе({props.taskStatus?.inWork})</button>
            <button className={props.completionStatus === "true" ? "filter-btn filter-btn__active" : "filter-btn"} onClick={() => props.setCompletionStatus("true")}>Завершенные({props.taskStatus?.completed})</button>
        </div>
    )
}

export default Filter