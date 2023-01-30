import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '569ec94a508a4457bcb668c12991c048',
  environment: 'testenv',
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      { children }
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
