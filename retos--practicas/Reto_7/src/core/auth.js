import { db } from './seed.js';
export const loginRequest = (email, pass) => {
  const user = db.find(u => u.email === email && u.pass === pass);
  return user ? { ...user, at: new Date().toISOString() } : null;
};
