import { useState, useRef, useEffect } from 'react';
import { Person, SortedQueue } from './Estructuras/list.js';

export default function App() {
  const queueRef = useRef(new SortedQueue());
  const [state, setState] = useState({ version: 0, data: [] });
  const KEY = 'atm_vault_data';

  const sync = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return seed();
      const json = JSON.parse(raw);
      const q = new SortedQueue();
      json.data.forEach(p => q.enqueue(new Person(p.id, p.name, p.amount, p.arrivalDate)));
      queueRef.current = q;
      setState(q.toArray());
    } catch { seed(); }
  };

  const seed = () => {
    const q = new SortedQueue();
    const now = Date.now();
    [['Carlos Gomez', 50000, -600000], ['Ana Ramirez', 120000, -400000], ['Luis Perez', 30000, -200000], ['Diana Lopez', 150000, -100000], ['Jorge Silva', 80000, 0]]
    .forEach(([n, a, t]) => q.enqueue(new Person(null, n, a, new Date(now + t))));
    queueRef.current = q;
    save();
  };

  const save = () => {
    const snap = queueRef.current.toArray();
    localStorage.setItem(KEY, JSON.stringify(snap));
    setState(snap);
  };

  useEffect(() => {
    sync();
    const handle = (e) => { if (e.key === KEY) sync(); };
    window.addEventListener('storage', handle);
    return () => window.removeEventListener('storage', handle);
  }, []);

  const add = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const randDate = new Date(Date.now() - Math.floor(Math.random() * 86400000));
      queueRef.current.enqueue(new Person(null, fd.get('cli'), fd.get('mnt'), randDate));
      save();
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h3>Control de Cajero</h3>
      <form onSubmit={add} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input name="cli" placeholder="Nombre" required style={{padding:'8px'}} />
        <input name="mnt" type="number" placeholder="Monto" required style={{padding:'8px'}} />
        <button type="submit" style={{padding:'10px', background:'#222', color:'#fff', border:'none'}}>Registrar</button>
      </form>
      <button onClick={() => { if(queueRef.current.dequeue()) save(); }} disabled={state.data.length === 0} style={{width:'100%', padding:'10px', marginBottom:'20px'}}>
        Atender Siguiente
      </button>
      <div>
        <strong>Cola de espera ({state.data.length})</strong>
        {state.data.map(p => (
          <div key={p.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0', display:'flex', justifyContent:'space-between' }}>
            <span>{p.name} (<code></code>)</span>
            <small style={{color:'#666'}}>{new Date(p.arrivalDate).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
