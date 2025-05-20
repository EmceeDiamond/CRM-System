import React from "react"
import { TodoInfo } from "../../Types/Interfase"
import styles from './Filter.module.css'
import { FilterStatus } from "../../Types/Interfase"
import { Flex, Button } from "antd"

type PropsFilter = {
    completionStatus: FilterStatus, 
    taskStatus?: TodoInfo,
    setCompletionStatus: React.Dispatch<React.SetStateAction<FilterStatus>>
}

const Filter = (props: PropsFilter) => {
    return (
        <Flex gap="large" className={styles.filter}> 
            <Button
                className={`${styles.filter__btn} ${props.completionStatus === FilterStatus.all ? styles.btn__active : ''}`} 
                onClick={() => props.setCompletionStatus(FilterStatus.all)}>
                Все({props.taskStatus?.all})
            </Button>
            <Button
                className={`${styles.filter__btn} ${props.completionStatus === FilterStatus.inWork ? styles.btn__active : ''}`} 
                onClick={() => props.setCompletionStatus(FilterStatus.inWork)}>
                В прогрессе({props.taskStatus?.inWork})
            </Button>
            <Button
                className={`${styles.filter__btn} ${props.completionStatus === FilterStatus.completed ? styles.btn__active : ''}`} 
                onClick={() => props.setCompletionStatus(FilterStatus.completed)}>
                Завершенные({props.taskStatus?.completed})
            </Button>
        </Flex>
    )
}

export default Filter