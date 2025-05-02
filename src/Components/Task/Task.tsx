import { Todo, TodoRequest } from "../../Types/Interfase"
import { deleteTodo, putTodo } from "../../API/fetch"
import styles from './Task.module.css'
import React, { useState } from "react"

type Props = {
    task: Todo,
    updateState: () => void
}
const Task = (props: Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [inputData, setInputData] = useState<string>(props.task.title);
    
    const handleDeleteTask = async(id: number, e: React.FormEvent) => {
        e.preventDefault()
        try {
            await deleteTodo(id);
            props.updateState();
        } catch(err) {
            console.error(err)
        }
    }

    const handleStartEdit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsEdit(true)
    }

    const handleSaveChanges = async(e: React.FormEvent) => {
        e.preventDefault()
        const todo: TodoRequest = {
            isDone: props.task.isDone,
            title: inputData,
            id: props.task.id
        }
        try {
            await putTodo(todo)
            props.updateState()
        } catch(err) {
            console.error(err)
        }
        setIsEdit(false)
    }

    const handleChangeStatus = async() => {

        console.log("Zapusk")
        const todo: TodoRequest = {
            isDone: !props.task.isDone,
            title: inputData,
            id: props.task.id
        }
        try {
            await putTodo(todo);
            props.updateState()
        } catch(err) {
            console.error(err)
        }
    }

    const handleUndoChanges = (e: React.FormEvent) => {
        e.preventDefault()
        setInputData(props.task.title)
        setIsEdit(false)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    return (
        <div className={styles.task} style={{height: (inputData.length < 26 ? 30 : inputData.length < 53 ? 50 : 70)}}>
            {isEdit ? 
                <div className={styles.editingMode}>
                    <div >
                        <form id="editingMode__form" className={styles.editingMode__txt}>
                            <input 
                                type="checkbox" 
                                id={"checkboxEdit"+`${props.task.id}`} 
                                className={styles.checkbox} 
                                checked={props.task.isDone} 
                                onChange={handleChangeStatus}/>
                            <label 
                                htmlFor={"checkboxEdit"+`${props.task.id}`} 
                                className={styles.checkboxLabel}></label>
                            <input 
                                defaultValue={props.task.title} 
                                onChange={handleInput} 
                                className={styles.editingMode__txt__input} 
                                style={{width: (props.task.title.length + 2) * 8}}/>
                        </form>
                        
                    </div>
                    <div className={styles.editingMode__btn}>
                        <button 
                            form="editingMode__form" 
                            onClick={handleSaveChanges} 
                            className={`${styles.btn} ${styles.btnSaveEdit}`}></button>
                        <button 
                            form="editingMode__form" 
                            onClick={handleUndoChanges} 
                            className={`${styles.btn} ${styles.btnBreakEdit}`}></button>
                        <button 
                            form="editingMode__form" 
                            onClick={(e) => handleDeleteTask(props.task.id, e)} 
                            className={`${styles.btn} ${styles.btnDelete}`}></button>
                    </div>
                    
                </div>    
                :
                <div className={styles.normalMode}>
                    <div className={styles.normalMode__txt}>
                        <form id="normalMode__form">
                            <input 
                                type="checkbox" 
                                id={"checkboxNormal"+`${props.task.id}`} 
                                className={styles.checkbox} 
                                checked={props.task.isDone} 
                                onChange={handleChangeStatus}/>
                            <label 
                                htmlFor={"checkboxNormal"+`${props.task.id}`} 
                                className={styles.checkboxLabel}></label>
                        </form>
                        <p>{props.task.title}</p>
                    </div>
                    <div className={styles.normalMode__btn}>
                        <button 
                            form="normalMode__form" 
                            onClick={handleStartEdit} 
                            className={`${styles.btn} ${styles.btnEdit}`}></button>   
                        <button 
                            form="normalMode__form" 
                            onClick={(e) => handleDeleteTask(props.task.id, e)} 
                            className={`${styles.btn} ${styles.btnDelete}`}></button>
                    </div>
                </div>
            }
        </div>
    )
}

export {Task}