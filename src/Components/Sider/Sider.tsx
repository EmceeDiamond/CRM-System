import { Layout, Menu } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import { useNavigate } from 'react-router-dom';
import style from './Sider.module.css';

const {Sider} = Layout;

const SiderComponent = () => {

    const navigate = useNavigate();
        
    return (
        <Sider className={style.sider}>
            <Menu className={style.navigationMenu}>
                <MenuItem>
                    <span onClick={() => navigate('./main')}>Список задач</span>
                </MenuItem>
                <MenuItem>
                    <span onClick={() => navigate('./profile')}>Личный кабинет</span>
                </MenuItem>
                <MenuItem>
                    <span onClick={() => navigate('./admin')}>Пользователи</span>
                </MenuItem>
            </Menu>
        </Sider>
        )
}

export default SiderComponent;