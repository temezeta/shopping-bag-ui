import { Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
        </Routes>
    );
};

export default AppRouter;
