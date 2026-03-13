import React, { useState, useEffect, useRef } from 'react';
import { Persona, ColaATM } from './logic/cola_prioridad';

const STORAGE_KEY = 'atm_p05_data';

export default function App() {
  const [datos, setDatos] = useState([]);
  const colaRef = useRef(new ColaATM());

  const sincronizar = () => {
    const snapshots = colaRef.current.exportar_datos();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    setDatos(snapshots);
  };

  const cargar = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return generar_seed();
      const parsed = JSON.parse(raw);
      const nueva_cola = new ColaATM();
      parsed.forEach(p => nueva_cola.encolar(new Persona(p.id, p.nombre, p.monto, p.fecha_llegada)));
      colaRef.current = nueva_cola;
      setDatos(nueva_cola.exportar_datos());
    } catch { generar_seed(); }
  };

  const generar_seed = () => {
    const seed_cola = new ColaATM();
    const base = Date.now();
    const mock = [
      ["Ana Perez", 500, -600000], ["Luis Gomez", 200, -300000],
      ["Juan Paez", 150, 0], ["Ana Maria", 900, -150000], ["Pedro Picapiedra", 50, -450000]
    ];
    mock.forEach(([n, m, offset]) => seed_cola.encolar(new Persona(null, n, m, new Date(base + offset))));
    colaRef.current = seed_cola;
    sincronizar();
  };

  useEffect(() => {
    cargar();
    const handleStorage = (e) => { if (e.key === STORAGE_KEY) cargar(); };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const random_offset = Math.floor(Math.random() * 3600000) - 1800000; // +/- 30 min
    try {
      colaRef.current.encolar(new Persona(null, form.get('nom'), form.get('cant'), new Date(Date.now() + random_offset)));
      sincronizar();
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>?? Cajero ATM - Estructura Blindada</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input name="nom" placeholder="Nombre" required />
        <input name="cant" type="number" placeholder="Monto" required />
        <button type="submit">Ingresar a la Fila (O(n) Sort)</button>
      </form>
      <button onClick={() => { colaRef.current.atender(); sincronizar(); }} disabled={datos.length === 0} style={{ width: '100%', padding: '10px' }}>
        Atender Siguiente (O(1))
      </button>
      <div style={{ marginTop: '20px' }}>
        {datos.map(p => (
          <div key={p.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <strong>{p.nombre}</strong> -  <br/>
            <small>Llegada: {new Date(p.fecha_llegada).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
