import { Layout } from 'antd'
//import style from './LayoutMain.module.css'
import SiderComponent from "../../Sider/Sider";
import { Outlet } from "react-router-dom";

const LayoutMainComponent =() =>{

    return(
        <Layout>
            <SiderComponent />
            <Outlet />
        </Layout>
    )
}

export default LayoutMainComponent;