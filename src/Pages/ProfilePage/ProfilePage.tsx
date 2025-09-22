import { Form } from 'antd';
import { getUserProfile } from '../../API/userApi';
import { useEffect, useState } from 'react';
import { Profile } from '../../Types/Interfase';
import style from './ProfilePage.module.css'

function ProfilePage() {

    const [userProfileData, setUserProfileData] = useState<Profile>()

    const getUserProfileData = async () => {
        try {
            const data = await getUserProfile();
            if (data !== undefined) {
                setUserProfileData(data)
            }
        }
        catch {
            console.error("Error")
        }
    }

    useEffect(() => {
        getUserProfileData()
    }, [])

    return (
        <Form className={style.profilePage}>
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
    )
}

export default ProfilePage;