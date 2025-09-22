import { Todo, TodoRequest } from "../../Types/Interfase"
import { deleteTodo, putTodo } from "../../API/api"
import styles from './Task.module.css'
import { useState } from "react"
import { Flex, Form, Input, Checkbox, Button, Typography } from "antd"
import { EditTwoTone, DeleteOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons';
import { messageError, lenString } from "../ValidationParametrs"
import { useDispatch } from "react-redux"
import { changeTask, changeTaskStatus } from "../../ReduxStore/taskSlice"

type Props = {
    task: Todo,
    updateState: () => void
}

const { Paragraph } = Typography;

const Task = (props: Props) => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    //const [inputData, setInputData] = useState<string>(props.task.title);
    const [form] = Form.useForm();
    
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
            title: form.getFieldValue('edit'),
            id: props.task.id
        }
        try {
            dispatch(changeTask(todo))
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
            title: props.task.title,
            id: props.task.id
        }
        try {
            dispatch(changeTaskStatus({isDone: todo.isDone || false, id: todo.id}))
            await putTodo(todo);
            props.updateState()
        } catch(err) {
            console.error(err)
        }
    }

    const handleUndoChanges = () => {
        setIsEdit(false)
        
        console.log(props.task)
    }

    return (
        <Flex style={{height: (props.task.title.length < 26 ? 30 : props.task.title.length < 53 ? 50 : 70)}}>
            {isEdit ?
                <Flex className={styles.editingMode}>
                    <Form
                        onReset={handleUndoChanges}
                        id="editingMode__form"
                        onFinish={handleSaveChanges}
                        onFinishFailed={() => console.log("asd")}
                        //onFinish={props.task.title !== form.getFieldValue('edit') ? handleSaveChanges : () => void}
                        form={form}
                        //initialValues={props.task.title}
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
                                //initialValue={props.task.title}
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
                                    //onChange={handleInput}
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
                            //form="normalMode__form" 
                            icon={<EditTwoTone />}
                            onClick={handleStartEdit}
                            style={{fontSize: '150%', color:"green"}} 
                            className={`${styles.btn}`}
                        />
                        <Button
                            htmlType="button"
                            //form="normalMode__form"
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