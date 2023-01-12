import React, { useEffect, useRef } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SignUpPage = () => {
  const handleSubmit = () => {
    //
    console.info('hi!');
  };

  const location = useLocation();
  const loginInput = useRef(null);

  useEffect(() => {
    loginInput.current.focus();
  }, [location]);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <article className="login border border-primary rounded-2 p-3">
        <h1 className="login__title">Sign up</h1>

        <Formik
          initialValues={{
            login: '',
            password: '',
            passwordConfirmation: '',
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
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Password must match')
              .required('Password confirmation is required'),
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
                    autoComplete="off"
                    name="login"
                    className="w-100"
                    placeholder="Login"
                    aria-describedby="loginErrorMessage"
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
                    autoComplete="off"
                    name="password"
                    className="w-100"
                    placeholder="Password"
                    aria-describedby="passwordErrorMessage"
                    type="password" />
                </FormLabel>

                <p className="text-danger m-0">
                  <ErrorMessage id="passwordErrorMessage" name="password"/>
                </p>
              </FormGroup>

              <FormGroup className="mb-2">
                <FormLabel htmlFor="passwordConfirmation" className="w-100">
                  <Field
                    id="passwordConfirmation"
                    autoComplete="off"
                    name="passwordConfirmation"
                    className="w-100"
                    placeholder="Password confirmation"
                    aria-describedby="passwordConfirmationErrorMessage"
                    type="password" />
                </FormLabel>

                <p className="text-danger m-0">
                  <ErrorMessage id="passwordConfirmationErrorMessage" name="passwordConfirmation"/>
                </p>
              </FormGroup>

              <FormGroup className="d-flex justify-content-center mb-2">
                <Button type="submit">
                  Sign up
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
