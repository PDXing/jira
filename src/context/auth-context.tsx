import React, { ReactNode, useContext, useState } from 'react';
import { User } from 'screens/project-list/search-panel';
import * as auth from 'auth-provider';
import { http } from 'utils/http';
import { useMount } from 'utils';

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
  const [user, setUser] = useState<User | null>(null);

  const login = (from: AuthFrom) => auth.login(from).then(setUser);
  const register = (from: AuthFrom) => auth.register(from).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用！');
  }
  return context;
};
