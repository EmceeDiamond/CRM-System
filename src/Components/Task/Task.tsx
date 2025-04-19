import { Todo } from "../../Interface/Interfase"
import { fetchDelete, fetchPut } from "../../API/fetch"
import './Task.css'
import React, { useState } from "react"

type Props = {
    task: Todo,
    updateState: () => void
}
const Task = (props: Props) => {

    const [flag, setFlag] = useState(false)
    const [inputData, setInputData] = useState<string>(props.task.title);
    
    const deleteTask = (id: number) => {
        fetchDelete(id).then(() => {
            console.log("del")
            props.updateState()
        })
    }

    const saveChanges = () => {
        fetchPut(props.task.isDone, inputData, props.task.id).then(() =>
            props.updateState()
        )
        setFlag(false)
    }

    const changeStatus = () => {
        fetchPut(!props.task.isDone, inputData, props.task.id).then(() =>
            props.updateState()
        )
    }

    const undoChanges = () => {
        setInputData(props.task.title)
        setFlag(false)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    return (
        <div className="task">
            {flag ? 
                <div className="editing__mode">
                    <div className="editing__mode-txt">
                        <input type="checkbox" id={"checkbox-edit"+`${props.task.id}`} className="style__input-checkbox" checked={props.task.isDone} onChange={() => changeStatus()}/>
                        <label htmlFor={"checkbox-edit"+`${props.task.id}`} className="style__label-checkbox"></label>
                        <input defaultValue={props.task.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} className="editing__mode-txt__input" style={{width: (props.task.title.length + 2) * 8}}/>
                    </div>
                    <div className="editing__mode-btn">
                        <button onClick={() => saveChanges()} className="save-change__task"></button>
                        <button onClick={() => undoChanges()} className="break-change__task"></button>
                        <button onClick={() => deleteTask(props.task.id)} className="delete-task"></button>
                    </div>
                    
                </div>    
                :
                <div className="normal__mode">
                    <div className="normal__mode-txt">
                        <input type="checkbox" id={"checkbox-normal"+`${props.task.id}`} className="style__input-checkbox" checked={props.task.isDone} onChange={() => changeStatus()}/>
                        <label htmlFor={"checkbox-normal"+`${props.task.id}`} className="style__label-checkbox"></label>
                        <p>{props.task.title}</p>
                    </div>
                    <div className="normal__mode-btn">
                        <button onClick={() => setFlag(true)} className="edit-task"></button>   
                        <button onClick={() => deleteTask(props.task.id)} className="delete-task"></button>
                    </div>
                </div>
            }
        </div>
    )
}

export {Task}