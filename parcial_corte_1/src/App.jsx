import React, { useState, useRef, useEffect } from 'react';
import { Nodo, ColaPrioridad } from './Estructuras/list.js';

export default function App() {
  const colaRef = useRef(new ColaPrioridad());
  const [pacientes, setPacientes] = useState([]);
  const [actual, setActual] = useState(null);

  const refrescar = () => setPacientes(colaRef.current.obtenerSnapshot());

  useEffect(() => {
    const iniciales = [new Nodo('1', 'Paciente Alfa', 2), new Nodo('2', 'Paciente Beta', 1)];
    colaRef.current = new ColaPrioridad(iniciales);
    refrescar();
  }, []);

  const registrar = (e) => {
    e.preventDefault();
    const n = e.target.nom.value, p = e.target.prio.value;
    colaRef.current.insertar(new Nodo(crypto.randomUUID(), n, p));
    refrescar();
    e.target.reset();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Triage Modular - Corte 1</h1>
      <form onSubmit={registrar} style={{ display: 'flex', gap: '10px' }}>
        <input name="nom" placeholder="Nombre" required />
        <select name="prio">
          <option value="1">1 - Crítico</option>
          <option value="5">5 - Rutina</option>
        </select>
        <button type="submit">Añadir</button>
      </form>
      <button onClick={() => { setActual(colaRef.current.extraerMin()); refrescar(); }}>Atender</button>
      <hr />
      <h3>En espera: {pacientes.length}</h3>
      <ul>{pacientes.map(p => <li key={p.id}>{p.nombre} (Prio: {p.nivel})</li>)}</ul>
    </div>
  );
}
