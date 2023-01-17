import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>{ t('error.title') }</h1>
      <p>{ t('error.description') }</p>
    </div>
  );
}
