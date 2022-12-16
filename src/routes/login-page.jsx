import '../style/login-page.css';

import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <article>
        <h1 className="login__title">Login</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="" className="login__form-label">
            <input
              placeholder="Login"
              type="text"
              className="login__form-input" />
          </label>

          <label htmlFor="" className="login__form-label">
            <input
              placeholder="Password"
              type="password"
              className="login__form-input" />
          </label>

          <button type="submit">
              Log in
          </button>
        </form>
      </article>
    </div>
  );
}
