import { Button, Descriptions, Flex } from 'antd';
import { getUserProfile, logoutUser } from '../../API/userApi';
import { useEffect, useState } from 'react';
import { isAuthenticatedStatus, Profile } from '../../Types/types';
import style from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../../Components/RefreshToken';
import { initializingAuth, logout } from '../../ReduxStore/Authorization/Slices/authSlice';
import { RootState } from '../../ReduxStore/store';
import { tokenManager } from '../../shared/AccessToken';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    const [userProfileData, setUserProfileData] = useState<Profile>();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selector = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        
        const getUserProfileData = async (): Promise <void> => {

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
                        else {
                            navigate('/auth/login')
                        }
                    }
                    
                }
            }
        }
        getUserProfileData()
    }, [dispatch, selector.isAuthenticatedStatus, navigate])

    const handlelogoutUser = async (): Promise <void> => {
        await logoutUser();
        tokenManager.clearAccessToken();
        localStorage.removeItem('refreshKey')
        dispatch(logout())
        navigate('./auth/login');
    }

    return (
        <Flex 
            justify='space-between'
            className={style.profilePage}>
            <Descriptions  
            layout='horizontal'
            column={1}>
                <Descriptions.Item
                className={style.userData}
                label='Username'>
                    {userProfileData?.username}
                </Descriptions.Item>
                <Descriptions.Item
                label='Email'>
                    {userProfileData?.email}
                </Descriptions.Item>
                <Descriptions.Item
                label='Phone Number'>
                    {userProfileData?.phoneNumber === undefined ? "-" : userProfileData?.phoneNumber}
                </Descriptions.Item>
            </Descriptions>
            <Button 
                type="text"
                onClick={handlelogoutUser}>Logout
            </Button>
        </Flex>
        
    )
}

export default ProfilePage;