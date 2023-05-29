/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import '../style/login-page.scss';

import React, { useEffect, useRef } from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import {
  Formik, Form, Field,
} from 'formik';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../components/auth-provider.jsx';
import routes from '../routes';
import useLoadingState from '../hooks/useLoadingState';

const LoginPage = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const loginInput = useRef(null);
  const [authError, updateAuthError] = useImmer({
    hasError: false,
    errorMessage: '',
  });
  const { isLoading, callWithLoading } = useLoadingState();

  useEffect(() => {
    loginInput.current.focus();
  }, [location]);

  const handleSubmit = async ({ login, password }) => {
    try {
      await callWithLoading(auth.signIn.bind(null, login, password));
      navigate(routes.rootPath());
    } catch ({ response }) {
      updateAuthError({
        hasError: true,
        errorMessage: response.status === 401 ? t('login.errors.401') : t('login.errors.request'),
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
        <h1 className="login__title">{ t('login.title') }</h1>

        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup className="form-floating mb-4">
                <Field
                  id="login"
                  innerRef={loginInput}
                  autoComplete="username"
                  name="login"
                  className="form-control"
                  aria-describedby="loginErrorMessage"
                  placeholder="login"
                  onFocus={resetAuthError}
                  type="text"
                />

                <FormLabel htmlFor="login" className="w-100 m-0">
                  { t('fields.login.placeholder2') }
                </FormLabel>
              </FormGroup>

              <FormGroup className="form-floating">

                <Field
                  id="password"
                  autoComplete="current-password"
                  name="password"
                  className="form-control"
                  aria-describedby="passwordErrorMessage"
                  placeholder="password"
                  onFocus={resetAuthError}
                  type="password"
                />

                <FormLabel htmlFor="password" className="w-100 m-0">
                  {t('fields.password.placeholder')}
                </FormLabel>
              </FormGroup>

              <p className="error-message text-danger m-0">
                { authError.hasError ? authError.errorMessage : null }
              </p>

              <div className="mb-2">
                {t('login.signUpText')}
                <Link to={routes.signUpPath()}>
                  {t('login.signUpLink')}
                </Link>
              </div>

              <FormGroup className="d-flex justify-content-center mb-2">
                <Button disabled={isLoading} type="submit">
                  {t('login.submit')}
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
