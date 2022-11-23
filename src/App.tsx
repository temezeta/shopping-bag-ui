import { useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import CustomSnackbar from './components/custom-snackbar/CustomSnackbar';
import { refreshTokenAsync } from './store/auth/auth-slice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAllOfficesAsync } from './store/office/office-slice';
import { getShoppingListsByOfficeAsync } from './store/shopping-list/shopping-list-slice';
import {
    getAllRolesAsync,
    selectCurrentOffice,
    selectCurrentUser,
} from './store/user/user-slice';

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
    }, [user]);

    useEffect(() => {
        void dispatch(getAllRolesAsync());
    });

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
