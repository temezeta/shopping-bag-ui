import { useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import CustomSnackbar from './components/custom-snackbar/CustomSnackbar';
import { refreshTokenAsync } from './store/auth/auth-slice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAllOfficesAsync } from './store/office/office-slice';
import { getShoppingListsByOfficeAsync } from './store/shopping-list/shopping-list-slice';
import {
    getAllUsersAsync,
    getAllRolesAsync,
    selectCurrentOffice,
    selectCurrentUser,
} from './store/user/user-slice';
import { isAdmin } from './utility/user-helper';

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const currentOffice = useAppSelector(selectCurrentOffice);
    const user = useAppSelector(selectCurrentUser);

    const fetchLists = async (): Promise<void> => {
        if (currentOffice) {
            await dispatch(getShoppingListsByOfficeAsync(currentOffice.id));
        }
    };

    const getRefreshToken = (): void => {
        const expiredToken = localStorage.getItem('authToken');
        if (expiredToken && user) {
            void dispatch(refreshTokenAsync({ expiredToken }));
        }
    };

    // Handle office change
    useEffect(() => {
        void fetchLists();
    }, [currentOffice]);

    useEffect(() => {
        void dispatch(getAllOfficesAsync());

        if (isAdmin(user)) {
            void dispatch(getAllUsersAsync());
            void dispatch(getAllRolesAsync());
        }
    }, [user]);

    // Call refresh token every 5 minutes
    useEffect(() => {
        const timer = setInterval(getRefreshToken, 300000);
        return () => clearInterval(timer);
    });

    return (
        <div className="App">
            <CustomSnackbar />
            <AppRouter></AppRouter>
        </div>
    );
}

export default App;
