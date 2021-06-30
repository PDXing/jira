import React, { useState } from 'react';

import { RegisterScreen } from 'unauthenticated-app/register';
import { LoginScreen } from 'unauthenticated-app/login';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={(e) => setIsregister(!isRegister)}>切换{isRegister ? '登录' : '注册'}</button>
    </div>
  );
};
