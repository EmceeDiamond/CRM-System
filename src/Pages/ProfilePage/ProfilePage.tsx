import { Button, Flex, Form } from 'antd';
import { getUserProfile, logoutUser } from '../../API/userApi';
import { useEffect, useState } from 'react';
import { isAuthenticatedStatus, Profile } from '../../Types/Interfase';
import style from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../../Components/RefreshToken';
import { initializingAuth, logout } from '../../ReduxStore/Authorization/Slices/authSlice';
import { RootState } from '../../ReduxStore/store';
import { tokenManager } from '../../shared/AccessToken';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {

    const [userProfileData, setUserProfileData] = useState<Profile>();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selector = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        
        const getUserProfileData = async () => {

            try {
                const data = await getUserProfile();
                if (data) {
                    setUserProfileData(data)
                }
            }
            catch(error) {
                const err = error as { status: number };

                if (err.status === 401) {
                    if (selector.isAuthenticatedStatus === isAuthenticatedStatus.authenticated) {
                        dispatch(initializingAuth())
                        const successRefreshToken = await refreshAccessToken(dispatch);

                        if (successRefreshToken) {
                            getUserProfileData();
                        }
                    }
                    
                }
            }
        }
        getUserProfileData()
    }, [dispatch, selector.isAuthenticatedStatus])

    const handlelogoutUser = async () => {
        await logoutUser();
        await navigate('./auth/login');
        
        tokenManager.clearAccessToken();
        localStorage.removeItem('refreshKey')
        dispatch(logout())
    }

    return (
        <Flex 
            justify='space-between'
            className={style.profilePage}>
            <Form>
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
                    {userProfileData?.phoneNumber === undefined ? "-" : userProfileData?.phoneNumber}
                </Form.Item>
            </Form>
            <Button 
                type="text"
                onClick={handlelogoutUser}>Logout
            </Button>
        </Flex>
        
    )
}

export default ProfilePage;