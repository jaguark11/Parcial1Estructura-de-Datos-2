import React, { useState, useRef, useEffect } from 'react';
import { Nodo, ColaPrioridad } from './Estructuras/list.js';

export default function App() {
  const colaRef = useRef(new ColaPrioridad());
  const [lista, setLista] = useState([]);
  const [actual, setActual] = useState(null);

  const refrescar = () => setLista(colaRef.current.getSnapshot());

  useEffect(() => {
    const mock = [new Nodo('1', 'Lucila', 2), new Nodo('2', 'Tiberio', 1)];
    colaRef.current = new ColaPrioridad(mock);
    refrescar();
  }, []);

  const registrar = (e) => {
    e.preventDefault();
    colaRef.current.insertar(new Nodo(crypto.randomUUID(), e.target.nom.value, e.target.prio.value));
    refrescar();
    e.target.reset();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Triage A&E - Parcial 1</h2>
      <form onSubmit={registrar}>
        <input name="nom" placeholder="Nombre" required />
        <select name="prio">
          <option value="1">1-Crítico</option>
          <option value="5">5-No Urgente</option>
        </select>
        <button type="submit">Ingresar</button>
      </form>
      <button onClick={() => { setActual(colaRef.current.extraerMin()); refrescar(); }}>Atender Siguiente</button>
      {actual && <p>Atendiendo: {actual.nombre}</p>}
      <h3>Espera: ({lista.length})</h3>
      <ul>{lista.map(p => <li key={p.id}>{p.nombre} - Prio: {p.nivel}</li>)}</ul>
    </div>
  );
}
