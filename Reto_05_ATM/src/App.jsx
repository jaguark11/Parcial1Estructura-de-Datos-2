import React, { useState, useRef, useEffect } from 'react';
import { Person, SortedATMQueue } from './Estructuras/list.js';

export default function App() {
  const colaRef = useRef(new SortedATMQueue());
  const [estado, setEstado] = useState({ version: 0, data: [] });
  const KEY = 'atm_vault_v2';

  const refrescar = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return inicializarSeed();

      const json = JSON.parse(raw);
      const nuevaCola = new SortedATMQueue();
      json.data.forEach(p => {
        nuevaCola.enqueue(new Person(p.id, p.name, p.amount, p.arrivalDate));
      });
      
      colaRef.current = nuevaCola;
      setEstado(nuevaCola.toArray());
    } catch (e) {
      localStorage.removeItem(KEY);
      inicializarSeed();
    }
  };

  const inicializarSeed = () => {
    const seed = new SortedATMQueue();
    const t = Date.now();
    [['K. Castrillon', 500, -600000], ['D. Martinez', 200, -400000], ['M. Fernanda', 300, -200000], ['E. Aurelio', 100, -100000], ['J. Guerrero', 50, 0]]
    .forEach(([n, a, o]) => seed.enqueue(new Person(null, n, a, new Date(t + o))));
    colaRef.current = seed;
    guardar();
  };

  const guardar = () => {
    const snap = colaRef.current.toArray();
    localStorage.setItem(KEY, JSON.stringify(snap));
    setEstado(snap);
  };

  useEffect(() => {
    refrescar();
    const sync = (e) => { if (e.key === KEY) refrescar(); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      colaRef.current.enqueue(new Person(null, fd.get('nom'), fd.get('cant'), new Date()));
      guardar();
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  const handleAttend = () => {
    if (colaRef.current.dequeue()) guardar();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', fontFamily: 'system-ui' }}>
      <h2>?? ATM Control - Blindado</h2>
      <form onSubmit={handleAdd} style={{ display: 'grid', gap: '8px' }}>
        <input name="nom" placeholder="Nombre" required />
        <input name="cant" type="number" step="0.01" placeholder="Monto" required />
        <button type="submit">Hacer Fila</button>
      </form>
      <button onClick={handleAttend} disabled={estado.data.length === 0} style={{ margin: '15px 0', width: '100%' }}>
        Atender (O(1))
      </button>
      <section>
        <h4>Cola de Espera ({estado.data.length})</h4>
        {estado.data.map(p => (
          <div key={p.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <strong>{p.name}</strong> -  <br/>
            <small>{new Date(p.arrivalDate).toLocaleTimeString()}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
