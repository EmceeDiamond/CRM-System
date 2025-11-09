import TodoListPage from './Pages/TodoListPage/TodoListPage.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage/ProfilePage.tsx';
import LayoutMainComponent from './Components/Layout/LayoutMain/LayoutMain.tsx';
import LayoutAuthorizationComponent from './Components/Layout/LayoutAuthorization/LayoutAuthorization.tsx';
import AuthorizationPage from './Pages/AuthorizationPage/AuthorizationPage.tsx';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage.tsx';
import PrivateRoute from './Components/PrivateRoute.tsx';
import { refreshAccessToken } from './Components/RefreshToken.ts';
import { useDispatch } from 'react-redux';

export const AppRoutes = () => {

    const dispatch = useDispatch();
    
    refreshAccessToken(dispatch);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<LayoutMainComponent />}>
                        <Route path='profile' element={<ProfilePage />}/>
                        <Route path="main" element={<TodoListPage />}/>
                    </Route>
                </Route>

                <Route path="/auth" element={<LayoutAuthorizationComponent/>}>
                    <Route path='login' element={<AuthorizationPage />}/>
                    <Route path='registration' element={<RegistrationPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}