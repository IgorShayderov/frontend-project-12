import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import PropTypes from 'prop-types';

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

RollbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RollbarProvider;
