import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { Auth, Manager } from './views/Components.jsx';
import './styles/main.scss';

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider><TaskProvider><BrowserRouter><Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Auth reg />} />
      <Route path="/tasks" element={<Protected><Manager /></Protected>} />
    </Routes></BrowserRouter></TaskProvider></AuthProvider>
  );
}
