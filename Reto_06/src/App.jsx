import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { Login } from './views/Login.jsx';
import { Layout, Exercise } from './views/Pages.jsx';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}><Route path="/ex1" element={<Exercise n="1"/>} /><Route path="/ex2" element={<Exercise n="2"/>} /></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
