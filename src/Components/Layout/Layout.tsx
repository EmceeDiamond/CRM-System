import { ReactNode } from "react";
import { Layout } from 'antd';
import SiderComponent from "../Sider/Sider";

const { Content } = Layout;

const LayoutComponent =(props: {children: ReactNode}) =>{

    return(
        <Layout> 
            <Layout style={{backgroundColor: "white"}}>
                <Content>
                    <main>{props.children}</main>
                </Content>
            </Layout>
            <SiderComponent />
        </Layout>
    )
}

export default LayoutComponent;