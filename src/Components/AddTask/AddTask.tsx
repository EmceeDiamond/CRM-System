import { useState } from "react";
import { postTodo } from "../../API/fetch";
import styles from './AddTask.module.css'

type PropsAddTask = {
    getData: () => void
}

const AddTask = (props: PropsAddTask) => {
    const [inputData, setInputData] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
        e.target.setCustomValidity("");
    }

    const addTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputData.length < 2 || inputData.length > 64){
            alert(`Длинна текста должна быть от 2 до 64 символов. Длинна вашего текста: ${inputData .length}`)
        }
        else {
            postTodo(false, inputData).then(() => {
                props.getData()
            })
        }
        setInputData("")
    }

    return (
        <form action="" onSubmit={addTask} className={styles.addTask}>
            <input 
                type="text" 
                value={inputData}
                required 
                className={styles.addTask__input}
                placeholder='Task To Be Done...' 
                onChange={handleInput} /> 
            <button className={styles.addTask__btn}>Add</button>
        </form>
    )
}

export default AddTask