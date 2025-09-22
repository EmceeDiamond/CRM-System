//import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../ReduxStore/store';
//import { refreshAccessToken } from './RefreshToken';
//import { RootState } from '../ReduxStore/store'

const PrivateRoute: React.FC = () => {
    // if (getAccessToken() === null) {
    //     refreshAccessToken()
    // }
    // else {
    //     toggleAuthenticated(true)
    // }
    //const isAuthenticated = getAccessToken() === null ? refreshAccessToken() : toggleAuthenticated(true);
    const sel = useSelector((state: RootState) => state.auth)

    if (sel.isAuthenticatedStatus === "initializing") {
        console.log("initializing")
        console.log(sel.isAuthenticatedStatus)
        return (
            <p>Loading...</p>
        )
    }
    if (!sel.isAuthenticated) {
        console.log("navigate")
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />

    
};

export default PrivateRoute;