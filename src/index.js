import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';
import SignUpPage from './routes/signup-page.jsx';
import store from './slices/index.js';
import AuthProvider from './components/auth-provider.jsx';
import Header from './components/header.jsx';
import initI18n from './i18n.js';

axios.defaults.baseURL = 'api/v1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

const initApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const i18n = initI18n();

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <Header />

            <RouterProvider router={router} />
          </AuthProvider>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>,
  );
};

initApp();
