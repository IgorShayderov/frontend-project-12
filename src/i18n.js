import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

const initI18N = () => {
  const i18nextInstance = i18n.createInstance();
  const defaultLanguage = 'ru';

  i18nextInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      debug: true,
      resources,
    });

  return i18nextInstance;
};

export default initI18N;
