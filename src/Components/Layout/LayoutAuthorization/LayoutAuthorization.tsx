import skeletonImage from '../../img/skeleton.svg'
import { Layout, Image, Flex } from 'antd'
import { Outlet } from "react-router-dom";

const LayoutAuthorizationComponent =() =>{

    return(
        <Layout style={{height: '100vh', boxSizing: 'border-box'}}> 
            <Flex>
                <Image
                preview={false}
                src={skeletonImage}
                width='53%'
                height='100%'
                sizes="contain"
                />
                <Outlet />
            </Flex>
        </Layout>
        
    )
}

export default LayoutAuthorizationComponent;