import React, { ReactNode, useContext } from 'react';
import { User } from 'screens/project-list/search-panel';
import * as auth from 'auth-provider';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageError, FullPageLoading } from 'components/lib';

interface AuthFrom {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (from: AuthFrom) => Promise<void>;
      register: (from: AuthFrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, error, isLoading, isError, isIdle, run, setData: setUser } = useAsync<User | null>();

  const login = (from: AuthFrom) => auth.login(from).then(setUser);
  const register = (from: AuthFrom) => auth.register(from).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用！');
  }
  return context;
};
