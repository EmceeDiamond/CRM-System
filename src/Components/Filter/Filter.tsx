import React from "react"
import { TodoInfo } from "../../Types/Interfase"
import styles from './Filter.module.css'
import { filterStatus } from "../../API/fetch"

type PropsFilter = {
    completionStatus: filterStatus, 
    taskStatus?: TodoInfo,
    setCompletionStatus: React.Dispatch<React.SetStateAction<filterStatus>>
}

const Filter = (props: PropsFilter) => {
    return (
        <div className={styles.filter}>
            <button 
                className={props.completionStatus === filterStatus.all ? `${styles.filter__btn} ${styles.btn__active}` : styles.filter__btn} 
                onClick={() => props.setCompletionStatus(filterStatus.all)} 
                autoFocus>
                Все({props.taskStatus?.all})
            </button>
            <button 
                className={props.completionStatus === filterStatus.inWork ? `${styles.filter__btn} ${styles.btn__active}` : styles.filter__btn} 
                onClick={() => props.setCompletionStatus(filterStatus.inWork)}>
                В прогрессе({props.taskStatus?.inWork})
            </button>
            <button 
                className={props.completionStatus === filterStatus.completed ? `${styles.filter__btn} ${styles.btn__active}` : styles.filter__btn}
                onClick={() => props.setCompletionStatus(filterStatus.completed)}>
                Завершенные({props.taskStatus?.completed})
            </button>
        </div>
    )
}

export default Filter