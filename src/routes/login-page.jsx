import '../style/login-page.scss';

import React, { useEffect, useRef } from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useRouteError, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage = () => {
  const error = useRouteError();
  console.error(error);

  const location = useLocation;
  const loginInput = useRef(null);

  useEffect(() => {
    loginInput.current.focus();
  }, [location]);

  const handleSubmit = ({ login, password }, { resetForm }) => {
    axios.post('login', {
      username: login,
      password,
    });
    resetForm();
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
              .required('Required'),
            password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .min(5, 'Must be at least 5 characters')
              .required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="">
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
                    type="password" />
                </FormLabel>

                <p className="error-message m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

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
