import { Button, Flex, Form, Input, Typography, Image, Checkbox } from "antd";
import logoImage from '../../Components/img/ImageOverForm.svg';
import skeletonImage from '../../Components/img/skeleton.svg';
import style from './AuthorizationPage.module.css';
import { useNavigate } from "react-router-dom";
import { postAuthenticateUser } from "../../API/userApi";
import { setAccessToken } from "../../Components/AccessToken";
import { Token } from "../../Types/Interfase";
import { useDispatch } from "react-redux";
import { toggleAuthenticated } from "../../ReduxStore/Authorization/Slices/authSlice";


const {Title, Paragraph} = Typography

type dataAuthenticateUser = {
    login: string,
    password: string,
    rememberUser: boolean
}

const AuthorizationPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const [form] = Form.useForm();

    const handleCreateAccount = () => {
        navigate('/auth/registration')
    }

    const handleAuthorizationAccount = async (values: dataAuthenticateUser) => {
        try {
            const status: Token = await postAuthenticateUser(values)
            if (status !== undefined) {
                setAccessToken(status.accessToken)
                localStorage.setItem('refreshKey', status.refreshToken.toString())
                dispatch(toggleAuthenticated(true))
                navigate('/main')
            }
            else {
                alert('Неверные логин или пароль')
            }
        }
        catch(err) {
            console.error(err)
        }
        form.resetFields()
    }

    return (
        
        <Flex className={style.authorizationPage}>
            <Image
                preview={false}
                src={skeletonImage}
                width="calc((1109+167/2)/1920*100%)"
                height="100%"
                sizes="contain"
                />
            <Flex 
                vertical 
                className={style.rightSectionPage}>
                
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
                        label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Login</Title>}>
                        <Input type="e-mail" placeholder="mail@abc.com"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<Title level={5} style={{color: "rgb(130, 130, 130)", margin: 0}}>Password</Title>}>
                        <Input title="Password" type="password" placeholder="************"/>
                    </Form.Item>
                    <Flex justify="space-between">
                        <Form.Item name="rememberUser" valuePropName="checked" style={{color: "rgb(127, 38, 91)"}} label={null}>
                            <Checkbox 
                                >
                                Remember Me
                            </Checkbox>
                        </Form.Item>
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
                    <Button type="link" style={{color: "rgb(127, 38, 91)"}} onClick={() => handleCreateAccount()}>Create an account</Button>
                </Flex>
            </Flex>
        </Flex>
        
        
    )
}

export default AuthorizationPage