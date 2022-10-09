import { Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import ItemDetails from './features/item-details/ItemDetails';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="item" element={<ItemDetails />}></Route>
        </Routes>
    );
};

export default AppRouter;
