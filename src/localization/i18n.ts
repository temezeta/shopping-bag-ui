import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';

const resources = {
    en: {
        translation: enTranslation,
    },
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});

export default i18next;
