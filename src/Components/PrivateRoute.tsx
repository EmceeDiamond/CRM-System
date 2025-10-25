import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../ReduxStore/store';
import { isAuthenticatedStatus } from '../Types/Interfase';

const PrivateRoute: React.FC = () => {

    const selectorAuthState = useSelector((state: RootState) => state.auth)
    if (selectorAuthState.isAuthenticatedStatus === isAuthenticatedStatus.initializing) {
        return (
            <p>Loading...</p>
        )
    }
    if (!selectorAuthState.isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />

    
};

export default PrivateRoute;