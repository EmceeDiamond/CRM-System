import { postNewTodo } from "../../API/api";
import styles from './AddTask.module.css'
import { Button, Form, Input, Flex } from 'antd';
import { messageError, lenString } from "../ValidationParametrs";
import { FilterStatus } from "../../Types/Interfase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxStore/store";
import { addTask } from "../../ReduxStore/taskSlice";

type PropsAddTask = {
    getData: (completionStatus: FilterStatus) => void
}

const AddTask = (props: PropsAddTask) => {
    const [form] = Form.useForm();
    const storeSelector = useSelector((state: RootState) => state.task);
    const dispath = useDispatch();

    const handleAddTask = async () => {
        const inputValue = form.getFieldValue('task')
        try {
            await postNewTodo(inputValue)
            dispath(addTask(inputValue))
            props.getData(storeSelector.taskStatus)
        }
        catch(err) {
            console.error(err)
            alert("Ошибка при добавлении новой задачи, попробуйте снова")
        }
        form.resetFields();
    }

    return (
        <Form onFinish={handleAddTask} form={form}>
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