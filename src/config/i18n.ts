import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from '../assets/translations';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
