import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import LoginPage from './routes/login-page.jsx';

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
    <Nav className="header">
      <Nav.Item>
        <Nav.Link href="/">
          Hexlet chat
        </Nav.Link>
      </Nav.Item>
    </Nav>

    <RouterProvider router={router} />
  </React.StrictMode>,
);
