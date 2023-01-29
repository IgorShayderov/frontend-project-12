import React, { useEffect, useRef } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../components/auth-provider.jsx';
import getYupLocale from '../locales/getYupLocale.js';

const SignUpPage = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const navigate = useNavigate();
  const [authError, updateAuthError] = useImmer({
    hasError: false,
    errorMessage: '',
  });

  const handleSubmit = async ({ login, password }) => {
    try {
      await auth.signUp(login, password);
      navigate('/');
    } catch ({ response }) {
      updateAuthError({
        hasError: true,
        errorMessage: response.status === 409 ? 'Login is already exists' : 'Server error',
      });
    }
  };

  const location = useLocation();
  const loginInput = useRef(null);

  useEffect(() => {
    Yup.setLocale(getYupLocale(t));
    loginInput.current.focus();
  }, [location]);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <article className="login border border-primary rounded-2 p-3">
        <h1 className="login__title">{ t('signUp.title') }</h1>

        <Formik
          initialValues={{
            login: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={Yup.object({
            login: Yup.string()
              .max(20)
              .min(3)
              .required(),
            password: Yup.string()
              .max(15)
              .min(6)
              .required(),
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref('password'), null], t('fields.passwordConfirmation.errors.different'))
              .required(),
          })}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup>
                <FormLabel htmlFor="login" className="w-100 m-0">
                  <Field
                    id="login"
                    innerRef={loginInput}
                    autoComplete="off"
                    name="login"
                    className="w-100"
                    placeholder={t('fields.login.placeholder')}
                    aria-describedby="loginErrorMessage"
                    type="text" />
                </FormLabel>

                <p className="error-message text-danger m-0">
                  <ErrorMessage id="loginErrorMessage" name="login"/>
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="password" className="w-100 m-0">
                  <Field
                    id="password"
                    autoComplete="off"
                    name="password"
                    className="w-100"
                    placeholder={t('fields.password.placeholder')}
                    aria-describedby="passwordErrorMessage"
                    type="password" />
                </FormLabel>

                <p className="error-message text-danger m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="passwordConfirmation" className="w-100 m-0">
                  <Field
                    id="passwordConfirmation"
                    autoComplete="off"
                    name="passwordConfirmation"
                    className="w-100"
                    placeholder={t('fields.passwordConfirmation.placeholder')}
                    aria-describedby="passwordConfirmationErrorMessage"
                    type="password" />
                </FormLabel>

                <p className="error-message text-danger m-0">
                  <ErrorMessage id="passwordConfirmationErrorMessage" name="passwordConfirmation"/>
                </p>
              </FormGroup>

              <p className="text-danger mb-2">
                { authError.hasError ? authError.errorMessage : null }
              </p>

              <FormGroup className="d-flex justify-content-center mb-2">
                <Button type="submit">
                  { t('signUp.submit') }
                </Button>
              </FormGroup>

            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
};

export default SignUpPage;
