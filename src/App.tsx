import React from 'react';
import { useAuth } from 'context/auth-context';

import './App.css';

import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageError } from 'components/lib';

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary fallback={FullPageError}>
      <div className="App">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
    </ErrorBoundary>
  );
}

export default App;
