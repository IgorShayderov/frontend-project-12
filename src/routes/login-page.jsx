import '../style/login-page.css';

import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { useRouteError } from 'react-router-dom';
import * as Yup from 'yup';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const handleSubmit = (event) => {
    console.info(event, 'submiting...');
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
          {({ errors, touched }) => (
            <Form className="login__form">
              <label htmlFor="login" className="login__form-label">
                <Field
                  id="login"
                  autocomplete="username"
                  name="login"
                  className="login__form-input"
                  placeholder="Login"
                  type="text" />
              </label>

              { errors.login && touched.login ? <div>{ errors.login }</div> : null }

              <label htmlFor="password" className="login__form-label">
                <Field
                  id="password"
                  autocomplete="current-password"
                  name="password"
                  className="login__form-input"
                  placeholder="Password"
                  type="password" />
              </label>

              { errors.password && touched.password ? <div>{ errors.password }</div> : null }

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
