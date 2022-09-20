import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import AppRouter from './AppRouter';
import { useTranslation } from 'react-i18next';

function App(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>{t('translation')}</span>
            </header>
            <AppRouter></AppRouter>
        </div>
    );
}

export default App;
