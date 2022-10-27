import { Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import AddShoppingList from './features/shopping-lists/AddShoppingList';
import { Role } from './models/user/RoleEnum';
import ItemDetails from './features/item-details/ItemDetails';
import AddItem from './features/add-item/AddItem';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
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
            <Route path="item" element={<ItemDetails />}></Route>
            <Route path="addItem/:id" element={<AddItem />}></Route>
        </Routes>
    );
};

export default AppRouter;
