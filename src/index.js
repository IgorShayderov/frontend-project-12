import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';

import ToastProvider from './components/toast-provider.jsx';
import RollbackProvider from './components/rollback-provider.jsx';
import App from './app.jsx';

import store from './slices/index.js';
import initI18n from './i18n.js';
import getYupLocale from './locales/getYupLocale.js';
import api from './api';
import { actions as messagesActions } from './slices/messages-slice';
import { actions as channelsActions } from './slices/channels-slice';

const initApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const i18n = await initI18n();

  leoProfanity.loadDictionary('ru');

  Yup.setLocale(getYupLocale(i18n.t));

  api.listenSocketEvent('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  api.listenSocketEvent('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  api.listenSocketEvent('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  api.listenSocketEvent('removeChannel', (payload) => {
    const { id } = payload;

    store.dispatch(channelsActions.removeChannel(id));
  });

  root.render(
    <React.StrictMode>
      <RollbackProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </I18nextProvider>
        </Provider>

      </RollbackProvider>
    </React.StrictMode>,
  );
};

initApp();
