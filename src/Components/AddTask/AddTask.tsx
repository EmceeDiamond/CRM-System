import { postNewTodo } from "../../API/api";
import styles from './AddTask.module.css'
import { Button, Form, Input, Flex } from 'antd';
import { messageError, lenString } from "../ValidationParametrs";

type PropsAddTask = {
    getData: () => void
}

const AddTask = (props: PropsAddTask) => {
    const [form] = Form.useForm();

    const handleAddTask = async () => {
        const inputValue = form.getFieldValue('task')
        try {
            await postNewTodo(inputValue)
            await props.getData()
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