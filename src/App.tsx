import { useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import CustomSnackbar from './components/custom-snackbar/CustomSnackbar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAllOfficesAsync } from './store/office/office-slice';
import { getShoppingListsByOfficeAsync } from './store/shopping-list/shopping-list-slice';
import { selectCurrentOffice } from './store/user/user-slice';

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const currentOffice = useAppSelector(selectCurrentOffice);

    const fetchLists = async (): Promise<void> => {
        if (currentOffice) {
            await dispatch(getShoppingListsByOfficeAsync(currentOffice.id));
        }
    };

    // Handle office change
    useEffect(() => {
        void fetchLists();
    }, [currentOffice]);

    useEffect(() => {
        void dispatch(getAllOfficesAsync());
    }, []);

    return (
        <div className="App">
            <CustomSnackbar />
            <AppRouter></AppRouter>
        </div>
    );
}

export default App;
