import { Button, Flex, Form, Input, Typography, Image, notification } from "antd";
import logoImage from '../../Components/img/ImageOverForm.svg';
import style from './AuthorizationPage.module.css';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../API/userApi";
import { tokenManager } from "../../shared/AccessToken";
import { Token, dataAuthenticateUser } from "../../Types/types";
import { useDispatch } from "react-redux";
import { toggleAuthenticated } from "../../ReduxStore/Authorization/Slices/authSlice";
import { REFRESH_TOKEN_KEY } from "../../Components/RefreshToken";

const {Title, Paragraph} = Typography

const AuthorizationPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const [form] = Form.useForm();
    const [errorAlert, contextHolder] = notification.useNotification();

    const handleCreateAccount = (): void => {
        navigate('/auth/registration')
    }

    const handleAuthorizationAccount = async (values: dataAuthenticateUser): Promise <void> => {
        try {
            const tokens: Token = await authenticateUser(values)

            if (tokens) {
                tokenManager.setAccessToken(tokens.accessToken)
                localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken.toString())
                dispatch(toggleAuthenticated(true))
                navigate('/main')
            }
            else {
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Неверные логин или пароль!",
                    placement: "topRight",
                    duration: 7
                });
            }
        }
        catch(err) {

            const error = err as {status: number} 

            if (error.status === 401){ 
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Неверные учетные данные!",
                    placement: "topRight",
                    duration: 7
                });
            }
        } finally {
            form.resetFields()
        }
        
    }

    return (
        <Flex 
            vertical 
            className={style.rightSectionPage}>
            {contextHolder}
            <Form
                form={form}
                initialValues={{
                    rememberUser: false
                }}
                className={style.authorizationForm}
                onFinish={(values) => handleAuthorizationAccount(values)}
                layout="vertical">
                <Image
                preview={false}
                src={logoImage}
                width={72}
                className={style.logoForm}/>
                <Flex vertical justify="center">
                    <Title className={style.authorizationFormTitle} style={{fontWeight: 700, fontSize: 36, color: "rgb(82, 82, 82)", margin: 0}}>Login to your Account</Title>
                    <Paragraph style={{fontWeight: 400, fontSize: 16, color: "rgb(82, 82, 82)"}}>See what is going on with your business</Paragraph>
                </Flex>
                <Form.Item
                    name="login"
                    label={<Title level={5} className={style.labelInputFields}>Login</Title>}>
                    <Input type="text" placeholder="mail@abc.com"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label={<Title level={5} className={style.labelInputFields}>Password</Title>}>
                    <Input title="Password" type="password" placeholder="************"/>
                </Form.Item>
                <Flex justify="space-between">
                    <Form.Item>
                        <Button type="link" style={{color: "rgb(127, 38, 91)"}}>Forgot Password?</Button>
                    </Form.Item>
                </Flex>
                <Form.Item >
                    <Button 
                        className={style.loginBtn}
                        htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
            <Flex style={{justifyContent: "center", alignItems: "center"}}>
                <Paragraph style={{margin: 0}}>Not Registered Yet?</Paragraph>
                <Button type="link" style={{color: "rgb(127, 38, 91)"}} onClick={handleCreateAccount}>Create an account</Button>
            </Flex>
        </Flex>
    )
}

export default AuthorizationPage