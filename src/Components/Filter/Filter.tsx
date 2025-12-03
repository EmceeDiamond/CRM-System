import styles from './Filter.module.css'
import { FilterStatus } from "../../Types/types"
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
                Все({storeSelector.taskList.data?.info.all})
            </Button>
            <Button
                className={`${styles.filter__btn} ${storeSelector.taskStatus === FilterStatus.inWork ? styles.btn__active : ''}`} 
                onClick={() => dispatch(changeTaskListStatus(FilterStatus.inWork))}>
                В прогрессе({storeSelector.taskList.data?.info.inWork})
            </Button>
            <Button
                className={`${styles.filter__btn} ${storeSelector.taskStatus === FilterStatus.completed ? styles.btn__active : ''}`} 
                onClick={() => dispatch(changeTaskListStatus(FilterStatus.completed))}>
                Завершенные({storeSelector.taskList.data?.info.completed})
            </Button>
        </Flex>
    )
}

export default Filter