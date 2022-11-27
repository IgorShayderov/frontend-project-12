import React from 'react';
import { useRouteError } from 'react-router-dom';

// На странице /login создайте форму авторизации, состоящую из полей
// для ввода имени пользователя и пароля, а также кнопки отправки формы.
// Для создания формы используйте библиотеку Formik, для валидации полей ввода — yup.
// Отправку формы реализовывать на этом этапе не нужно.

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Login page</h1>
    </div>
  );
}
