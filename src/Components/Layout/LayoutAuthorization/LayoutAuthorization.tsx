
//import { useNavigate } from "react-router-dom";
import { Layout } from 'antd'
import { Outlet } from "react-router-dom";
//import MenuItem from "antd/es/menu/MenuItem";
//import style from './LayoutAuthorization.module.css'

const LayoutAuthorizationComponent =() =>{
    //const navigate = useNavigate();

    return(
        <Layout style={{height: '100vh'}}> 
            <Outlet />
        </Layout>
        
    )
}

export default LayoutAuthorizationComponent;