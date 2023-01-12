import '../style/login-page.scss';

import React, { useEffect, useRef } from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import {
  useRouteError, useLocation, useNavigate, Link,
} from 'react-router-dom';
import { useImmer } from 'use-immer';
import * as Yup from 'yup';

import { useAuth } from '../components/auth-provider.jsx';

const LoginPage = () => {
  const error = useRouteError();
  console.error(error, 'router error?');

  const auth = useAuth();

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
      await auth.signIn(login, password);
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
              .max(20, 'Must be 15 characters or less')
              .min(3, 'Must be at least 3 characters')
              .required('Login is required'),
            password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .min(6, 'Must be at least 5 characters')
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

                <p className="text-danger m-0">
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

                <p className="text-danger m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

              <p className="text-danger mb-2">
                { authError.hasError ? authError.errorMessage : null }
              </p>

              <div className="mb-2">
                <Link to="/signup">
                Don&apos;t have an account? Sign up
                </Link>
              </div>

              <FormGroup className="d-flex justify-content-center mb-2">
                <Button type="submit">
                  Log in
                </Button>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
};

export default LoginPage;
