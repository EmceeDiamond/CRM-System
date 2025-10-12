import styles from './Filter.module.css'
import { FilterStatus } from "../../Types/Interfase"
import { Flex, Button } from "antd"
import { RootState } from "../../ReduxStore/store"
import { useDispatch, useSelector } from "react-redux"
import { changeTaskListStatus } from "../../ReduxStore/Authorization/Slices/taskSlice"

const Filter = () => {
    const storeSelector = useSelector((state: RootState) => state.task)
    const dispatch = useDispatch()
    return (
        <Flex gap="large" className={styles.filter}> 
            <Button
                className={`${styles.filter__btn} ${storeSelector.taskStatus === FilterStatus.all ? styles.btn__active : ''}`} 
                onClick={() => dispatch(changeTaskListStatus(FilterStatus.all))}>
                Все({storeSelector.taskCountsByStatus?.all})
            </Button>
            <Button
                className={`${styles.filter__btn} ${storeSelector.taskStatus === FilterStatus.inWork ? styles.btn__active : ''}`} 
                onClick={() => dispatch(changeTaskListStatus(FilterStatus.inWork))}>
                В прогрессе({storeSelector.taskCountsByStatus?.inWork})
            </Button>
            <Button
                className={`${styles.filter__btn} ${storeSelector.taskStatus === FilterStatus.completed ? styles.btn__active : ''}`} 
                onClick={() => dispatch(changeTaskListStatus(FilterStatus.completed))}>
                Завершенные({storeSelector.taskCountsByStatus?.completed})
            </Button>
        </Flex>
    )
}

export default Filter