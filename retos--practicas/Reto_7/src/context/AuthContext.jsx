import { createContext, useState, useEffect, useContext } from 'react';
import { loginRequest } from '../core/auth.js';
const AuthCtx = createContext();
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('session')));
  const login = (e, p) => {
    const res = loginRequest(e, p);
    if (res) { localStorage.setItem('session', JSON.stringify(res)); setSession(res); }
    return !!res;
  };
  const logout = () => { localStorage.removeItem('session'); setSession(null); };
  useEffect(() => {
    const sync = (e) => e.key === 'session' && setSession(e.newValue ? JSON.parse(e.newValue) : null);
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return <AuthCtx.Provider value={{ session, login, logout }}>{children}</AuthCtx.Provider>;
};
export const useAuth = () => useContext(AuthCtx);
