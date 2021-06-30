import React from 'react';
import { useAuth } from 'context/auth-context';

import { ProjectListScreen } from 'screens/project-list';

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <>
      <button onClick={(e) => logout()}>退出登录</button>
      <ProjectListScreen />
    </>
  );
};
