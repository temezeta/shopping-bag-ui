import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth-guard/AuthGuard';
import SessionGuard from './components/session-guard/SessionGuard';
import Home from './features/home/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route path="session" element={<SessionGuard />}></Route>
            {/** Unprotected routes */}
            <Route path="" element={<Navigate to="session" />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            {/** Protected routes */}
            <Route element={<AuthGuard />}>
                <Route path="home" element={<Home />}></Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
