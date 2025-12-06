import { Todo, TodoRequest } from "../../Types/types"
import { deleteTodo, changeTodo } from "../../API/api"
import styles from './Task.module.css'
import { useState } from "react"
import { Flex, Form, Input, Checkbox, Button, Typography, notification } from "antd"
import { EditTwoTone, DeleteOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons';
import { messageError, lenString } from "../ValidationParametrs"
import { useDispatch, useSelector } from "react-redux"
import { changeTask, changeTaskStatus, getTaskList } from "../../ReduxStore/Authorization/Slices/taskSlice"
import { AppDispatch, RootState } from "../../ReduxStore/store"

type Props = {
    task: Todo,
}

const { Paragraph } = Typography;

const Task = (props: Props) => {

    const dispatch: AppDispatch = useDispatch()
    const stateTaskSelector = useSelector((state: RootState) => state.task)

    const [error, contextHolder] = notification.useNotification();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [form] = Form.useForm();
    
    const handleDeleteTask = async(id: number): Promise <void> => {
        try {
            await deleteTodo(id);
            dispatch(getTaskList(stateTaskSelector.taskStatus))
        } 
        catch {
            error.info({
                message: "Ошибка!",
                description: "Ошибка при удалении задачи, попробуйте снова",
                placement: "topRight",
                duration: 7
            });
        }
    }

    const handleStartEdit = (): void => {
        setIsEdit(true)
    }

    const handleSaveChanges = async(): Promise <void> => {
        const todo: TodoRequest = {
            isDone: props.task.isDone,
            title: form.getFieldValue('edit'),
            id: props.task.id
        }
        try {
            dispatch(changeTask(todo))
            await changeTodo(todo)
            dispatch(getTaskList(stateTaskSelector.taskStatus))
        } 
        catch {
            error.info({
                message: "Ошибка!",
                description: "Ошибка при изменении задачи, попробуйте снова",
                placement: "topRight",
                duration: 7
            });
        }
        setIsEdit(false)
    }

    const handleChangeStatus = async(): Promise <void> => {
        const todo: TodoRequest = {
            isDone: !props.task.isDone,
            title: props.task.title,
            id: props.task.id
        }
        try {
            dispatch(changeTaskStatus({isDone: todo.isDone || false, id: todo.id}))
            await changeTodo(todo);
            dispatch(getTaskList(stateTaskSelector.taskStatus))
        } 
        catch {
            error.info({
                message: "Ошибка!",
                description: "Ошибка при изменении статуса задачи, попробуйте снова",
                placement: "topRight",
                duration: 7
            });
        }
    }

    const handleUndoChanges = (): void => {
        setIsEdit(false)
    }

    return (
        <Flex style={{height: (props.task.title.length < 26 ? 30 : props.task.title.length < 53 ? 50 : 70)}}>
            {contextHolder}
            {isEdit ?
                <Flex className={styles.editingMode}>
                    <Form
                        onReset={handleUndoChanges}
                        id="editingMode__form"
                        onFinish={handleSaveChanges}
                        onFinishFailed={() => console.log("asd")}
                        form={form}
                    >
                        <Flex className={styles.editingMode__txt}>
                            <Form.Item className={styles.formItem}>
                                <Checkbox
                                    checked={props.task.isDone} 
                                    onChange={handleChangeStatus}
                                />
                            </Form.Item> 
                            <Form.Item 
                                name="edit" 
                                label="" 
                                className={styles.formItem}
                                rules={[
                                    {
                                        required: true,
                                        message: messageError.emptyString
                                    },
                                    { 
                                        whitespace: true,
                                        message: messageError.sendingEmptyString
                                    },
                                    { 
                                        min: lenString.min,
                                        message: messageError.minLenString
                                    },
                                    {
                                        max: lenString.max,
                                        message: messageError.maxLenString
                                    }
                                ]}
                                
                            
                                >
                                <Input
                                    defaultValue={props.task.title}
                                    autoFocus
                                    type="text"
                                    className={styles.editingMode__txt__input}
                                    style={{width: ((props.task.title.length) + 2) * 10}}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                    <Flex className={styles.editingMode__btn}>
                        <Button 
                            htmlType="submit"
                            form="editingMode__form" 
                            icon={<SaveOutlined />}
                            style={{fontSize: '150%', color:"green"}}
                            className={`${styles.btn}`}                        
                        />
                        <Button 
                            htmlType="reset"
                            form="editingMode__form" 
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
                        <Checkbox 
                            checked={props.task.isDone} 
                            onChange={handleChangeStatus}
                        />
                        <Paragraph style={{margin: 0}}>{props.task.title}</Paragraph>
                    </Flex >
                    <Flex className={styles.normalMode__btn}>
                        <Button
                            htmlType="button"
                            icon={<EditTwoTone />}
                            onClick={handleStartEdit}
                            style={{fontSize: '150%', color:"green"}} 
                            className={`${styles.btn}`}
                        />
                        <Button
                            htmlType="button"
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