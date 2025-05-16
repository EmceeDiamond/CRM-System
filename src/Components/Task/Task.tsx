import { Todo, TodoRequest } from "../../Types/Interfase"
import { deleteTodo, putTodo } from "../../API/fetch"
import styles from './Task.module.css'
import React, { useState } from "react"
import { Flex, Form, Input, Checkbox, Button, Typography } from "antd"
import { EditTwoTone, DeleteOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons';

type Props = {
    task: Todo,
    updateState: () => void
}

const { Paragraph } = Typography;

const Task = (props: Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [inputData, setInputData] = useState<string>(props.task.title);
    
    const handleDeleteTask = async(id: number) => {
        try {
            await deleteTodo(id);
            props.updateState();
        } catch(err) {
            console.error(err)
        }
    }

    const handleStartEdit = () => {
        setIsEdit(true)
    }

    const handleSaveChanges = async() => {
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

    const handleUndoChanges = () => {
        setInputData(props.task.title)
        setIsEdit(false)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    return (
        <Flex style={{height: (inputData.length < 26 ? 30 : inputData.length < 53 ? 50 : 70)}}>
            {isEdit ? 
                <Flex className={styles.editingMode}> 
                    <Form id="editingMode__form">
                        <Flex className={styles.editingMode__txt}>
                            <Form.Item className={styles.formItem}>
                                <Checkbox 
                                    checked={props.task.isDone} 
                                    onChange={handleChangeStatus}
                                />
                            </Form.Item> 
                            <Form.Item className={styles.formItem}>
                                <Input
                                    defaultValue={props.task.title} 
                                    onChange={handleInput} 
                                    className={styles.editingMode__txt__input} 
                                    style={{width: ((props.task.title.length > inputData.length ? props.task.title.length : inputData.length) + 2) * 10}}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                    <Flex className={styles.editingMode__btn}>
                        <Button 
                            htmlType="button"
                            form="editingMode__form" 
                            onClick={handleSaveChanges} 
                            icon={<SaveOutlined />}
                            style={{fontSize: '150%', color:"green"}}
                            className={`${styles.btn}`}                        
                        />
                        <Button 
                            htmlType="button"
                            form="editingMode__form" 
                            onClick={handleUndoChanges}
                            icon={<UndoOutlined />} 
                            style={{fontSize: '150%', color:"red"}}
                            className={`${styles.btn}`}
                        />
                        <Button 
                            htmlType="button"
                            form="editingMode__form" 
                            onClick={() => handleDeleteTask(props.task.id)} 
                            className={`${styles.btn}`}
                            icon={<DeleteOutlined />} 
                            style={{fontSize: '150%', color: 'red'}}
                        />
                    </Flex>
                </Flex>
            : 
                <Flex className={styles.normalMode}>
                    <Flex className={styles.normalMode__txt}>
                        <Form id="normalMode__form">
                            <Form.Item className={styles.formItem}>
                                <Checkbox 
                                    checked={props.task.isDone} 
                                    onChange={handleChangeStatus}
                                />
                            </Form.Item>
                        </Form>
                        <Paragraph style={{margin: 0}}>{props.task.title}</Paragraph>
                    </Flex >
                    <Flex className={styles.normalMode__btn}>
                        <Button
                            htmlType="button"
                            form="normalMode__form" 
                            icon={<EditTwoTone />}
                            onClick={handleStartEdit}
                            style={{fontSize: '150%', color:"green"}} 
                            className={`${styles.btn}`}
                        />
                        <Button 
                            htmlType="button"
                            form="normalMode__form"
                            icon={<DeleteOutlined />} 
                            style={{fontSize: '150%', color: 'red'}}
                            onClick={() => handleDeleteTask(props.task.id)} 
                            className={`${styles.btn}`} 
                        />
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}

export {Task}