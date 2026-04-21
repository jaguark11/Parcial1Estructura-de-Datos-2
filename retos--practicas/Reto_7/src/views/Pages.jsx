import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export const Layout = () => {
  const { session, logout } = useAuth();
  if (!session) return <Navigate to="/" replace />;
  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <nav style={{display:'flex', gap:'10px', padding:'10px', background:'#eee'}}>
        <strong>{session.name}</strong> <Link to="/ex1">P1</Link> <Link to="/ex2">P2</Link>
        <button onClick={logout}>Salir</button>
      </nav>
      <main style={{padding:'20px'}}><Outlet /></main>
    </div>
  );
};
export const Exercise = ({n}) => <div><h3>Reto {n}</h3><p>Acceso verificado.</p></div>;
