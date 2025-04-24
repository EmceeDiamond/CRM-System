import { useState } from "react";
import { fetchPost } from "../../API/fetch";
import './AddTask.css'

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
            alert("ХХХ")
        }
        else {
            fetchPost(false, inputData).then(() => {
                props.getData()
            })
        }
        setInputData("")
    }

    return (
        <div className="input__form">
            <form action="" onSubmit={(e: React.FormEvent) => addTask(e)}>
            <input 
                type="text" 
                value={inputData}
                required 
                minLength={2} 
                maxLength={64} 
                className='input__form-task__new' 
                placeholder='Task To Be Done...' 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} />
            <button className='input__form-task__add' onClick={(e: React.FormEvent) => addTask(e)}>Add</button>
            </form>
        </div>
    )
}

export default AddTask