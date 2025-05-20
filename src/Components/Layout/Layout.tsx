import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd'
import MenuItem from "antd/es/menu/MenuItem";
import style from './Layout.module.css'

const { Content, Sider } = Layout;

const LayoutComponent =(props: {children: ReactNode}) =>{
    const navigate = useNavigate();

    return(
        <Layout> 
            <Layout style={{backgroundColor: "white"}}>
                <Content>
                    <main>{props.children}</main>
                </Content>
            </Layout>
            <Sider className={style.sider}>
                <Menu>
                    <MenuItem>
                        <span onClick={() => navigate('./todo-list')}>Todo List</span>
                    </MenuItem>
                    <MenuItem>
                        <span onClick={() => navigate('./profile')}>Profile</span>
                    </MenuItem>
                </Menu>
            </Sider>
        </Layout>
    )
}

export default LayoutComponent;