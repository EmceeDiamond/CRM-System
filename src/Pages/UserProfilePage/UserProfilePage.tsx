import { Button, Flex, Form, Input, notification, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfileByAdmin } from '../../API/adminApi';
import { User } from '../../Types/types';
import { useDispatch } from 'react-redux';
import { updateUsersProfileByAdmin } from '../../API/adminApi';
import style from './UserProfilePage.module.css'
import { UserRequest } from '../../Types/types';
import { refreshAccessToken } from '../../Components/RefreshToken';

const {Title, Paragraph} = Typography;

function UserProfilePage() {

    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorAlert, contextHolder] = notification.useNotification();

    const [userProfileData, setUserProfileData] = useState<User>();
    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [accessRights, setAccessRights] = useState<boolean>(true);

    const getUserProfileData =  useCallback(async() => {
        try {
            const data = await getUserProfileByAdmin(Number(userId));
            if (data) {
                setUserProfileData(data)
            }
        }
        catch(err) {
            const error = err as { status: number };

            if (error.status === 401) {
                await refreshAccessToken(dispatch);
            }

            if (error.status === 403){ 
                setAccessRights(false)
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Недостаточно прав для просмотра данных пользователей",
                    placement: "topRight",
                    duration: 7
                });
            }
        }
    }, [dispatch, errorAlert, userId])

    useEffect(() => {
        getUserProfileData()
    }, [getUserProfileData])

    const handleBackToTable = () => {
        navigate('/admin')
    }

    const handleStartEditingMode = () => {
        setEditingMode(true)
    }

    const handleCanselEditingMode = () => {
        setEditingMode(false)
    }

    const handleSaveChangeUserData = async(values: UserRequest) => {
        try {
            await updateUsersProfileByAdmin(Number(userId), values) 
            await getUserProfileData()
        }
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }

            if (error.status === 400){ 
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Новый Логин или Email уже занят",
                    placement: "topRight",
                    duration: 7
                });
            }

            if (error.status === 403){ 
                errorAlert.info({
                    message: "Ошибка!",
                    description: "Недостаточно прав для изменения данных пользователей",
                    placement: "topRight",
                    duration: 7
                });
            }
        }
        setEditingMode(false)
    }

    return (
        <Flex>
            {contextHolder}
            {
                accessRights ? 
                editingMode ? 
                <Flex 
                justify='space-between'
                >
                    <Form 
                    onFinish={handleSaveChangeUserData}
                    onReset={handleCanselEditingMode}>
                        <Form.Item
                        name='username'
                        label='Username'>
                            <Input
                            defaultValue={userProfileData?.username}
                            />
                        </Form.Item>
                        <Form.Item
                        name='email'
                        label='Email'>
                            <Input 
                            defaultValue={userProfileData?.email}
                            />
                        </Form.Item>
                        <Form.Item
                        name='phoneNumber'
                        label='Phone Number'>
                            <Input 
                            defaultValue={userProfileData?.phoneNumber}
                            />
                        </Form.Item>
                        <Flex gap={30}>
                            <Form.Item>
                                <Button htmlType='submit'>Сохранить</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='reset'>Отмена</Button>
                            </Form.Item>
                        </Flex>
                        
                    </Form>
                    <Button onClick={handleBackToTable}>Вернуться</Button>
                </Flex>
                :
                <Flex 
                justify='space-between'
                >
                    <Form onFinish={handleStartEditingMode}>
                        <Form.Item
                        label='Username'>
                            {userProfileData?.username}
                        </Form.Item>
                        <Form.Item
                        label='Email'>
                            {userProfileData?.email}
                        </Form.Item>
                        <Form.Item
                        label='Phone Number'>
                            {userProfileData?.phoneNumber}
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>Редактировать</Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={handleBackToTable}>Вернуться</Button>
                </Flex>
                :
                <Flex vertical className={style.errMessageForUsers}>
                    <Title className={style.errMessageForUsers__title}>Ошибка!!!</Title>
                    <Paragraph className={style.errMessageForUsers__paragraph}>У вас недостаточно прав для просмотра данных страницы.</Paragraph>
                </Flex>
            }
            
        </Flex>
    )
}

export default UserProfilePage;