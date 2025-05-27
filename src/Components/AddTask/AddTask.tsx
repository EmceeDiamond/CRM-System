import { postNewTodo } from "../../API/api";
import styles from './AddTask.module.css'
import { Button, Form, Input, Flex } from 'antd';

type PropsAddTask = {
    getData: () => void
}

const AddTask = (props: PropsAddTask) => {
    const [form] = Form.useForm();

    const handleAddTask = async () => {
        const inputValue = form.getFieldValue('task')
        try {
            await postNewTodo(inputValue)
            props.getData()
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
                            required: true
                        },
                        { 
                            whitespace: true,
                            message: "Ввод пустых сиволов запрещен"
                        },
                        { 
                            min: 2,
                            message: "Минимальная длинна текста 2 символа"
                        },
                        { 
                            max: 64,
                            message: "Максимальная длинна текста 64 символа"
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