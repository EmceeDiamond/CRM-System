import { Layout, Menu } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import { NavLink } from 'react-router-dom';
import style from './Sider.module.css';

const {Sider} = Layout;

const SiderComponent = () => {
        
    return (
        <Sider className={style.sider}>
            <Menu className={style.navigationMenu}>
                <MenuItem>
                    <NavLink to={'./main'}>Список задач</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to={'./profile'}>Личный кабинет</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to={'./admin'}>Пользователи</NavLink>
                </MenuItem>
            </Menu>
        </Sider>
        )
}

export default SiderComponent;