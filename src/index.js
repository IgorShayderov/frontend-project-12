import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import { actions as messagesActions } from './slices/messages-slice';
import { actions as channelsActions } from './slices/channels-slice';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';
import SignUpPage from './routes/signup-page.jsx';
import AuthProvider from './components/auth-provider.jsx';
import ToastProvider from './components/toast-provider.jsx';
import RollbackProvider from './components/rollback-provider.jsx';
import Header from './components/header.jsx';

import store from './slices/index.js';
import initI18n from './i18n.js';
import routes from './routes';
import getYupLocale from './locales/getYupLocale.js';
import api from './api';

const router = createBrowserRouter([
  {
    path: routes.rootPath(),
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.loginPath(),
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.signUpPath(),
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

const filter = require('leo-profanity');

const initApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const i18n = await initI18n();

  filter.loadDictionary('ru');

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
            <AuthProvider>
              <ToastProvider>
                <Header />

                <RouterProvider router={router} />
              </ToastProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>

      </RollbackProvider>
    </React.StrictMode>,
  );
};

initApp();
