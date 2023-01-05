import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
import { Provider } from 'react-redux';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';
import store from './slices/index.js';
import AuthProvider from './components/auth-provider.jsx';

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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Nav className="header border-bottom">
          <Nav.Item>
            <Nav.Link href="/">
              Hexlet chat
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
