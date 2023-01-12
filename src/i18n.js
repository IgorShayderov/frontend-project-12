import i18n from 'i18next';

import resources from './locales/index.js';

const initI18N = () => {
  const i18nextInstance = i18n.createInstance();
  const defaultLanguage = 'ru';

  i18nextInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  });
};

export default initI18N;
