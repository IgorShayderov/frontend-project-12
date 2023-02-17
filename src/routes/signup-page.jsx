import React, { useEffect, useRef } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';

import api from '../api';
import routes from '../routes';

const SignUpPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [authError, updateAuthError] = useImmer({
    hasError: false,
    errorMessage: '',
  });

  const handleSubmit = async ({ login, password }) => {
    try {
      await api.signUp({ login, password });
      navigate(routes.rootPath());
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
              .max(20, t('fields.login.errors.min', { min: 3, max: 20 }))
              .min(3, t('fields.login.errors.min', { min: 3, max: 20 }))
              .required(),
            password: Yup.string()
              .max(15, t('fields.password.errors.max', { max: 15 }))
              .min(6, t('fields.password.errors.min', { min: 6 }))
              .required(),
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref('password'), null], t('fields.passwordConfirmation.errors.different'))
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
                  autoComplete="off"
                  name="login"
                  className="form-control"
                  placeholder="login"
                  aria-describedby="loginErrorMessage"
                  type="text"
                />

                <FormLabel htmlFor="login" className="w-100 m-0">
                  {t('fields.login.placeholder')}
                </FormLabel>

                <p className="error-message text-danger ps-2 m-0">
                  <ErrorMessage id="loginErrorMessage" name="login" />
                </p>
              </FormGroup>

              <FormGroup className="form-floating">
                <Field
                  id="password"
                  autoComplete="off"
                  name="password"
                  className="form-control"
                  aria-describedby="passwordErrorMessage"
                  placeholder="password"
                  type="password"
                />

                <FormLabel htmlFor="password" className="w-100 m-0">
                  {t('fields.password.placeholder')}
                </FormLabel>

                <p className="error-message text-danger ps-2 m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password" />
                </p>
              </FormGroup>

              <FormGroup className="form-floating">
                <Field
                  id="passwordConfirmation"
                  autoComplete="off"
                  name="passwordConfirmation"
                  className="form-control"
                  placeholder="password confirmation"
                  aria-describedby="passwordConfirmationErrorMessage"
                  type="password"
                />

                <FormLabel htmlFor="passwordConfirmation" className="w-100 m-0">
                  {t('fields.passwordConfirmation.placeholder')}
                </FormLabel>

                <p className="error-message text-danger ps-2 m-0">
                  <ErrorMessage id="passwordConfirmationErrorMessage" name="passwordConfirmation" />
                </p>
              </FormGroup>

              <p className="error-message text-danger ps-2 m-0">
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
