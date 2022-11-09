import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth-guard/AuthGuard';
import SessionGuard from './components/session-guard/SessionGuard';
import Home from './features/home/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import AddShoppingList from './features/shopping-lists/AddShoppingList';
import EditShoppingList from './features/shopping-lists/EditShoppingList';
import { Role } from './models/user/RoleEnum';
import AddItem from './features/add-item/AddItem';
import AdminOrderList from './features/admin-order-list/AdminOrderList';
import EditItem from './features/edit-item/EditItem';
import PastOrders from './features/past-orders/PastOrders';

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
                <Route
                    path="order/:listId/add-item"
                    element={<AddItem />}
                ></Route>
                {/** TODO: Add listId to edit item route when available in ItemDto */}
                <Route
                    path="order/edit-item/:itemId"
                    element={<EditItem />}
                ></Route>
                <Route path="past-orders" element={<PastOrders />}></Route>
            </Route>
            {/** Admin routes */}
            <Route element={<AuthGuard roles={[Role.Admin]} />}>
                <Route path="orders/add" element={<AddShoppingList />}></Route>
                <Route path="orders" element={<AdminOrderList />}></Route>
                <Route
                    path="orders/:listId/edit"
                    element={<EditShoppingList />}
                ></Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
