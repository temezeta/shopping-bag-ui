import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth-guard/AuthGuard';
import Login from './features/login/Login';
import Register from './features/register/Register';
import ItemDetails from './features/item-details/ItemDetails';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            {/** Unprotected routes */}
            <Route path="" element={<Navigate to="login" />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            {/** Protected routes */}
            <Route element={<AuthGuard />}>
                <Route path="item" element={<ItemDetails />}></Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
