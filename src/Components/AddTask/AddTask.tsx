import { addNewTodo } from "../../API/api";
import styles from './AddTask.module.css'
import { Button, Form, Input, Flex, notification } from 'antd';
import { messageError, lenString } from "../ValidationParametrs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../ReduxStore/store";
import {  getTaskList } from "../../ReduxStore/Authorization/Slices/taskSlice";

const AddTask = () => {

    const [form] = Form.useForm();
    const [error, contextHolder] = notification.useNotification();

    const storeSelector = useSelector((state: RootState) => state.task);

    const dispath: AppDispatch = useDispatch();

    const handleAddTask = async () => {

        const inputValue = form.getFieldValue('task')

        try {
            await addNewTodo(inputValue)
            dispath(getTaskList(storeSelector.taskStatus))
        }
        catch {
            error.info({
                message: "Ошибка!",
                description: "Ошибка при добавлении новой задачи, попробуйте снова",
                placement: "topRight",
                duration: 7
            });
        }
        
        form.resetFields();
    }

    return (
        <Form onFinish={handleAddTask} form={form}>
            {contextHolder}
            <Flex gap="large">
                <Form.Item 
                    name="task" 
                    label="" 
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
                    ]}>
                    <Input 
                        type="text"
                        className={styles.addTask__input}
                        placeholder='Task To Be Done...' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" className={styles.addTask__btn}>Add</Button>
                </Form.Item>
            </Flex>
        </Form>
    )
}

export default AddTask