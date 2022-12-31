import '../style/login-page.scss';

import React from 'react';
import { FormGroup } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useRouteError } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const handleSubmit = ({ login, password }, { resetForm }) => {
    axios.post('login', {
      username: login,
      password,
    });
    resetForm();
  };

  return (
    <div className="login">
      <article>
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
            <Form className="login__form">
              <FormGroup>
                <label htmlFor="login" className="login__form-label">
                  <Field
                    id="login"
                    autoComplete="username"
                    name="login"
                    className="login__form-input"
                    placeholder="Login"
                    type="text" />
                </label>

                <ErrorMessage name="login"/>
              </FormGroup>

              <FormGroup>
                <label htmlFor="password" className="login__form-label">
                  <Field
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    className="login__form-input"
                    placeholder="Password"
                    type="password" />
                </label>

                <ErrorMessage name="password"/>
              </FormGroup>

              <button type="submit">
              Log in
              </button>
            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
}
