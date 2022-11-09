import './App.css';
import AppRouter from './AppRouter';
import CustomSnackbar from './components/custom-snackbar/CustomSnackbar';

function App(): JSX.Element {
    return (
        <div className="App">
            <CustomSnackbar />
            <AppRouter></AppRouter>
        </div>
    );
}

export default App;
