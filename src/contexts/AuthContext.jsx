import React, { createContext, useEffect, useState } from 'react';
import { getUserLogged, putAccessToken, getAccessToken, login as apiLogin } from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = getAccessToken();
      if (!token) {
        setInitializing(false);
        return;
      }
      const { error, data } = await getUserLogged();
      if (!error) setUser(data);
      setInitializing(false);
    }
    fetchUser();
  }, []);

  const onLogin = async ({ email, password }) => {
    const { error, data } = await apiLogin({ email, password });
    if (error) return { error: true };
    // save token
    putAccessToken(data.accessToken);
    // fetch user
    const me = await getUserLogged();
    if (!me.error) setUser(me.data);
    return { error: false };
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, onLogin, onLogout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
