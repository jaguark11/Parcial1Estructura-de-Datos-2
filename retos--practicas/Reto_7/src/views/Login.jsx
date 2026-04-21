import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export const Login = () => {
  const [f, setF] = useState({ e: '', p: '' });
  const { login } = useAuth();
  const nav = useNavigate();
  const hS = (e) => { e.preventDefault(); if (login(f.e, f.p)) nav('/ex1'); else alert('Error'); };
  return (
    <form onSubmit={hS} style={{margin:'100px auto', width:'200px', display:'flex', flexDirection:'column', gap:'10px'}}>
      <input type="email" placeholder="user@mail.com" onChange={x => setF({...f, e: x.target.value})} required />
      <input type="password" placeholder="123" onChange={x => setF({...f, p: x.target.value})} required />
      <button type="submit">Entrar</button>
    </form>
  );
};
