import '../style/login-page.scss';

import React, { useEffect, useRef } from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../components/auth-provider.jsx';
import getYupLocale from '../locales/getYupLocale.js';

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

  useEffect(() => {
    Yup.setLocale(getYupLocale(t));
    loginInput.current.focus();
  }, [location]);

  const handleSubmit = async ({ login, password }) => {
    try {
      await auth.signIn(login, password);
      navigate('/');
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
          validationSchema={Yup.object({
            login: Yup.string()
              .max(20)
              .min(3)
              .required(),
            password: Yup.string()
              .max(15)
              .min(5)
              .required(),
          })}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup className="form-floating">
                <Field
                  id="login"
                  innerRef={loginInput}
                  autoComplete="username"
                  name="login"
                  className="form-control"
                  aria-describedby="loginErrorMessage"
                  onFocus={resetAuthError}
                  type="text" />

                <FormLabel htmlFor="login" className="w-100 m-0">
                  { t('fields.login.placeholder') }
                </FormLabel>

                <p className="error-message text-danger ps-2 m-0">
                  <ErrorMessage id="loginErrorMessage" name="login"/>
                </p>
              </FormGroup>

              <FormGroup className="form-floating">

                <Field
                  id="password"
                  autoComplete="current-password"
                  name="password"
                  className="form-control"
                  aria-describedby="passwordErrorMessage"
                  onFocus={resetAuthError}
                  type="password" />

                <FormLabel htmlFor="password" className="w-100 m-0">
                  {t('fields.password.placeholder')}
                </FormLabel>

                <p className="error-message text-danger ps-2 m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

              <p className="error-message text-danger ps-2 m-0">
                { authError.hasError ? authError.errorMessage : null }
              </p>

              <div className="mb-2">
                {t('login.signUpText')}
                <Link to="/signup">
                  {t('login.signUpLink')}
                </Link>
              </div>

              <FormGroup className="d-flex justify-content-center mb-2">
                <Button type="submit">
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
