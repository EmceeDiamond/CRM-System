import { Layout, Menu } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import { useNavigate } from 'react-router-dom';
import style from './Sider.module.css'

const {Sider} = Layout;

const SiderComponent = () => {

    const navigate = useNavigate();

    return (
    <Sider className={style.sider}>
        <Menu>
            <MenuItem>
                <span onClick={() => navigate('./')}>Todo List</span>
            </MenuItem>
            <MenuItem>
                <span onClick={() => navigate('./profile')}>Profile</span>
            </MenuItem>
        </Menu>
    </Sider>
    )
}

export default SiderComponent;