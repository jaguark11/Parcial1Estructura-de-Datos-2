import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { authInstance } from '../core/firebase.js';
const AuthCtx = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(authInstance, (u) => { setUser(u); setLoading(false); }), []);
  const login = (e, p) => signInWithEmailAndPassword(authInstance, e, p);
  const register = (e, p) => createUserWithEmailAndPassword(authInstance, e, p);
  const logout = () => signOut(authInstance);
  return <AuthCtx.Provider value={{ user, loading, login, register, logout }}>{children}</AuthCtx.Provider>;
};
export const useAuth = () => useContext(AuthCtx);
