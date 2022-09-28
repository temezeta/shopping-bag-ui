import { Route, Routes } from 'react-router-dom';
import Register from './features/register/Register';

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route path="register" element={<Register />}></Route>
        </Routes>
    );
};

export default AppRouter;
