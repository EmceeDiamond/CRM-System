import { Button, Flex, Form, Input, Typography, Image, Modal, notification} from "antd";
import logoImage from '../../Components/img/ImageOverForm.svg';
import style from './RegistrationPage.module.css'
import { registerNewUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NewUser } from "../../Types/Interfase.js";

const {Title, Paragraph, Text} = Typography

const RegistrationPage = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [errorAlert, contextHolder] = notification.useNotification();

    const handleTransitionOnAuthorizationPage = () => {
        navigate('/auth/login')
        setModalActive(false)
    }

    const handleRegistrationNewUser = async (values: NewUser) => {
        
        try {
            const resultRegistration = await registerNewUser(values)
            if (resultRegistration){
                setModalActive(true)
            }
        }
        catch(err) {
            const error = err as {status: number}
            if (error.status === 409) {
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Такой пользователь уже существует!!!",
                    placement: "topRight",
                    duration: 7
            });

            }
            else {
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Ошибка при добавлении нового пользователя, попробуйте снова!!!",
                    placement: "topRight",
                    duration: 7
                });
            }
        }
        form.resetFields()
    }

    return (
        <Flex 
            vertical 
            className={style.rightSectionPage}>
            {contextHolder}
            <Form 
                className={style.registrationForm} 
                form={form} 
                onFinish={handleRegistrationNewUser} 
                layout="vertical">
                <Image
                    preview={false}
                    src={logoImage}
                    width={72}/>
                <Flex vertical justify="center">
                    <Title className={style.registrationForm__title} style={{fontWeight: 700, fontSize: 36, color: "rgb(82, 82, 82)", margin: 0}}>Register a new Account</Title>
                    <Paragraph style={{fontWeight: 400, fontSize: 16, color: "rgb(82, 82, 82)"}}>See what is going on with your business</Paragraph>
                </Flex>
                <Form.Item 
                    name="username"
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Username</Title>}
                    rules={[{ required: true,
                            message: 'Заполните поле Username'
                            },
                            {pattern: /^[a-zA-Zа-яА-Я]{1,60}$/,
                            message: 'Только буквы (латиница или кириллица), от 1 до 60 символов.'
                            },
                    ]}
                    >
                    <Input type="text"/>
                </Form.Item>
                <Form.Item
                    name='login'
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Login</Title>}
                    rules={[{ required: true,
                            message: 'Заполните поле Login'
                            },
                            {pattern: /^[a-zA-Z]{2,60}$/,
                            message: 'Только буквы латинского алфавита, от 2 до 60 символов.'
                            },
                    ]}>
                    <Input type="text"/>
                </Form.Item>
                <Form.Item
                    name='password'
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Password</Title>}
                                            rules={[{ required: true,
                            message: 'Заполните поле Password'
                            },
                            {min: 6, max: 60,
                            message: 'Текст должен быть от 6 до 60 символов.'
                            },
                    ]}>
                    <Input.Password placeholder="************"/>
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Заполните поле Confirm password!' },
                        ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                        },
                        }),
                    ]}
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Confirm password</Title>}>
                    <Input.Password placeholder="************"/>
                </Form.Item>
                <Form.Item
                    name='email'
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>E-mail</Title>}
                    rules={[{ required: true, message: 'Заполните поле E-mail'}]}>
                    <Input type="email" placeholder="mail1234@mail.ru"/>
                </Form.Item>
                <Form.Item
                    name='numberPhone'
                    label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Phone Number</Title>}
                    rules={[{ required: false },
                            { pattern: /^(\+7|7|8)(\d{10})$/,
                            message: 'Введите корректный номер (например, +79998887766)'}
                    ]}>
                    <Input type="number" placeholder="+79998989898"/>
                </Form.Item>
                <Form.Item
                    style={{margin: "0"}}>
                    <Button className={style.registerBtn} htmlType="submit">Register</Button>
                </Form.Item>
            </Form>            
            <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={modalActive}
            onOk={handleTransitionOnAuthorizationPage}
            onCancel={() => setModalActive(false)}>
                <Flex vertical>
                    <Text className={style.modalWindow__txt}>Регистрация прошла успешна!</Text>
                    <Text className={style.modalWindow__txt}>Перейти на страницу авторизации для входа в систему?</Text>
                    <Flex justify="space-around">
                        <Button className={style.modalWindow__btn}>Да</Button>
                        <Button className={style.modalWindow__btn}>Нет</Button>
                    </Flex>
                </Flex>
            </Modal>
        </Flex>       
    )
}

export default RegistrationPage