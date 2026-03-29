import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router-dom';

export const Auth = ({ reg }) => {
  const [f, setF] = useState({ e: '', p: '' });
  const { login, register } = useAuth();
  const nav = useNavigate();
  const h = async (e) => { e.preventDefault(); try { reg ? await register(f.e, f.p) : await login(f.e, f.p); nav('/tasks'); } catch (err) { alert(err.message); } };
  return (
    <div className="container mt-5" style={{maxWidth:'400px'}}>
      <form className="card p-4 shadow" onSubmit={h}>
        <h3>{reg ? 'Registro' : 'Login'}</h3>
        <input className="form-control mb-2" type="email" placeholder="email" onChange={x=>setF({...f,e:x.target.value})} required />
        <input className="form-control mb-2" type="password" placeholder="pass" onChange={x=>setF({...f,p:x.target.value})} required />
        <button className="btn btn-primary w-100">{reg ? 'Crear' : 'Entrar'}</button>
      </form>
    </div>
  );
};

export const Manager = () => {
  const { tasks, add, toggle, del, edit } = useTasks();
  const { logout, user } = useAuth();
  const [val, setVal] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) { edit(editId, val); setEditId(null); }
    else { add(val); }
    setVal('');
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <span><b>{user?.email}</b></span>
        <button className="btn btn-sm btn-outline-danger" onClick={logout}>Salir</button>
      </div>
      <form className="input-group mb-3" onSubmit={handleSubmit}>
        <input className="form-control" value={val} onChange={x=>setVal(x.target.value)} required placeholder="Tarea..." />
        <button className="btn btn-dark">{editId ? 'Guardar' : 'Añadir'}</button>
      </form>
      {tasks.map(t => (
        <div key={t.id} className={`alert d-flex justify-content-between ${t.isDone ? 'alert-success done' : 'alert-light shadow-sm'}`}>
          <span className="d-flex align-items-center">
            <input type="checkbox" className="me-2" checked={t.isDone} onChange={()=>toggle(t.id)}/>
            {t.title}
          </span>
          <div>
            <button className="btn btn-sm text-primary me-2" onClick={() => { setEditId(t.id); setVal(t.title); }}>Mod</button>
            <button className="btn btn-sm text-danger" onClick={()=>del(t.id)}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
};
