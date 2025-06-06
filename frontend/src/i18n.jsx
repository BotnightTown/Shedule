import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationUk from './locales/uk/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      uk: { translation: translationUk },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
