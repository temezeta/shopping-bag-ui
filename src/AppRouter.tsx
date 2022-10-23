import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth-guard/AuthGuard';
import SessionGuard from './components/session-guard/SessionGuard';
import Home from './features/home/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import AddShoppingList from './features/shopping-lists/AddShoppingList';
import { Role } from './models/user/RoleEnum';

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
            {/** Admin routes */}
            <Route element={<AuthGuard roles={[Role.Admin]} />}>
                <Route
                    path="addshoppinglist"
                    element={<AddShoppingList />}
                ></Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
