import '../style/login-page.scss';

import React, { useEffect, useRef } from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import {
  useRouteError, useLocation, useNavigate,
} from 'react-router-dom';
import { useImmer } from 'use-immer';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage = () => {
  const error = useRouteError();
  console.error(error, 'router error?');

  const navigate = useNavigate();
  const location = useLocation();
  const loginInput = useRef(null);
  const [authError, updateAuthError] = useImmer({
    hasError: false,
    errorMessage: '',
  });

  useEffect(() => {
    loginInput.current.focus();
  }, [location]);

  const handleSubmit = async ({ login, password }) => {
    try {
      const { token } = await axios.post('login', {
        username: login,
        password,
      });
      localStorage.setItem('token', token);
      navigate('/');
    } catch ({ response }) {
      updateAuthError({
        hasError: true,
        errorMessage: response.status === 401 ? 'Password or login is incorrect' : 'Server error',
      });
    }
  };
  const resetAuthError = () => {
    updateAuthError((authError) => {
      authError.hasError = false;
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <article className="login border border-primary rounded-2 p-3">
        <h1 className="login__title">Login</h1>

        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          validationSchema={Yup.object({
            login: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .min(3, 'Must be at least 3 characters')
              .required('Login is required'),
            password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .min(5, 'Must be at least 5 characters')
              .required('Password is required'),
          })}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup className="mb-2">
                <FormLabel htmlFor="login" className="w-100">
                  <Field
                    id="login"
                    innerRef={loginInput}
                    autoComplete="username"
                    name="login"
                    className="w-100"
                    placeholder="Login"
                    aria-describedby="loginErrorMessage"
                    onFocus={resetAuthError}
                    type="text" />
                </FormLabel>

                <p className="error-message m-0">
                  <ErrorMessage id="loginErrorMessage" name="login"/>
                </p>
              </FormGroup>

              <FormGroup className="mb-2">
                <FormLabel htmlFor="password" className="w-100">
                  <Field
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    className="w-100"
                    placeholder="Password"
                    aria-describedby="passwordErrorMessage"
                    onFocus={resetAuthError}
                    type="password" />
                </FormLabel>

                <p className="error-message m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

              <p className="error-message mb-2">
                { authError.hasError ? authError.errorMessage : null }
              </p>

              <Button type="submit">
              Log in
              </Button>
            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
};

export default LoginPage;
