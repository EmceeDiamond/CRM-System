import { Todo, TodoRequest } from "../../Types/Interfase"
import { deleteTodo, putTodo } from "../../API/api"
import styles from './Task.module.css'
import { useState } from "react"
import { Flex, Form, Input, Checkbox, Button, Typography } from "antd"
import { EditTwoTone, DeleteOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons';

type Props = {
    task: Todo,
    updateState: () => void
}

const { Paragraph } = Typography;

const messageError = {
    emptyString: "Это поле не может быть пустым",
    minLenString: "Минимальная длинна текста 2 символа",
    maxLenString: "Максимальная длинна текста 64 символа",
    sendingEmptyString: "Добавление пустых задач запрещен"
}

const lenString = {
    min: 2,
    max: 64
}

const Task = (props: Props) => {

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
            await putTodo(todo)
            props.updateState()
        } catch(err) {
            console.error(err)
        }
        setIsEdit(false)
        console.log(todo)
    }

    const handleChangeStatus = async() => {
        const todo: TodoRequest = {
            isDone: !props.task.isDone,
            title: props.task.title,
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
        //setInputData(props.task.title)
        setIsEdit(false)
        console.log("2")
    }

    return (
        <Flex style={{height: (props.task.title.length < 26 ? 30 : props.task.title.length < 53 ? 50 : 70)}}>
            {isEdit ? 
                <Flex className={styles.editingMode}> 
                    <Form 
                        id="editingMode__form" 
                        onFinish={handleSaveChanges} 
                        //onFinish={props.task.title !== form.getFieldValue('edit') ? handleSaveChanges : () => void}
                        onReset={handleUndoChanges} 
                        form={form}
                        initialValues={{edit: `${props.task.title}`}}
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
                                    //onChange={handleInput} 
                                    autoFocus
                                    type="text"
                                    className={styles.editingMode__txt__input} 
                                    style={{width: ((props.task.title.length > form.getFieldValue('edit').length ? props.task.title.length : form.getFieldValue('edit').length) + 2) * 10}}
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