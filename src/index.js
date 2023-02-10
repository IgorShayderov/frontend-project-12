import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import io from 'socket.io-client';
import { actions as messagesActions } from './slices/messages-slice';
import { actions as channelsActions } from './slices/channels-slice';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';
import SignUpPage from './routes/signup-page.jsx';
import store from './slices/index.js';
import AuthProvider from './components/auth-provider.jsx';
import Header from './components/header.jsx';
import initI18n from './i18n.js';
import ToastProvider from './components/toast-provider.jsx';
import RollbackProvider from './components/rollback-provider.jsx';
import routes from './routes';
import getYupLocale from './locales/getYupLocale.js';

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

const initApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const i18n = await initI18n();
  const socket = io();

  Yup.setLocale(getYupLocale(i18n.t));

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
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
