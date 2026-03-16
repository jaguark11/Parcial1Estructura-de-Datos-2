import React, { useState, useEffect } from 'react';

const TablaEstudiantes = ({ primerNodo, onEliminar }) => {
  const estudiantesRender = [];
  let actual = primerNodo;
  while (actual !== null) {
    estudiantesRender.push(actual);
    actual = actual.next;
  }
  return (
    <ul>
      {estudiantesRender.map((est) => (
        <li key={est.codigo}>
          {est.nombre} ({est.codigo}) 
          <button onClick={() => onEliminar(est.codigo)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default function RegistroApp() {
  const [head, setHead] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const [form, setForm] = useState({ nombre: '', edad: '', codigo: '' });

  useEffect(() => {
    console.log("Log: Lista de estudiantes actualizada.");
  }, [head, trigger]);

  const agregar = (e) => {
    e.preventDefault();
    const nuevo = { ...form, next: null };
    if (!head) { setHead(nuevo); } 
    else {
      let temp = head;
      while (temp.next) temp = temp.next;
      temp.next = nuevo;
    }
    setForm({ nombre: '', edad: '', codigo: '' });
    setTrigger(t => t + 1);
  };

  const eliminar = (id) => {
    if (!head) return;
    if (head.codigo === id) { setHead(head.next); setTrigger(t => t + 1); return; }
    let act = head;
    while (act.next && act.next.codigo !== id) act = act.next;
    if (act.next) { act.next = act.next.next; setTrigger(t => t + 1); }
  };

  return (
    <div>
      <form onSubmit={agregar}>
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required />
        <button type="submit">Añadir</button>
      </form>
      <TablaEstudiantes primerNodo={head} onEliminar={eliminar} />
    </div>
  );
}
