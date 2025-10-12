import { Layout, Menu } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import { useNavigate } from 'react-router-dom';
import style from './Sider.module.css'
import { postLogoutUser } from '../../API/userApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../ReduxStore/Authorization/Slices/authSlice';

const {Sider} = Layout;

const SiderComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        await postLogoutUser();
        await navigate('./auth/login')
        dispatch(logout())
    }

    return (
    <Sider className={style.sider}>
        <Menu>
            <MenuItem>
                <span onClick={() => navigate('./main')}>Список задач</span>
            </MenuItem>
            <MenuItem>
                <span onClick={() => navigate('./profile')}>Личный кабинет</span>
            </MenuItem>
            <MenuItem>
                <span onClick={ logoutUser }>Выйти из аккаунта</span>
            </MenuItem>
        </Menu>
    </Sider>
    )
}

export default SiderComponent;