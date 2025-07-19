import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationUk from './locales/uk/translation.json';

const browserLang = navigator.language.split('-')[0];

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      uk: { translation: translationUk },
    },
    lng:
      localStorage.getItem('lang') ||
      (['uk', 'en'].includes(browserLang) ? browserLang : 'uk'),
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
