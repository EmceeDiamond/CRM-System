import { useState } from "react";
import { postTodo } from "../../API/fetch";
import styles from './AddTask.module.css'
import { Button, Form, Input, Flex } from 'antd';

type PropsAddTask = {
    getData: () => void
}

const AddTask = (props: PropsAddTask) => {
    const [form] = Form.useForm();
    const [inputData, setInputData] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    const handleAddTask = () => {
        console.log(inputData)
        postTodo(inputData).then(() => props.getData());
        setInputData("")
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
                        value={inputData}
                        className={styles.addTask__input}
                        placeholder='Task To Be Done...' 
                        onChange={handleInput}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" className={styles.addTask__btn}>Add</Button>
                </Form.Item>
            </Flex>
        </Form>
    )
}

export default AddTask