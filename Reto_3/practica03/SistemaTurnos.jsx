import React, { useState, useEffect } from 'react';

export default function Turnos() {
  const [cabeza, setCabeza] = useState(null);
  const [actual, setActual] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (actual) console.log("Llamando al turno: " + actual.id);
  }, [actual]);

  const generar = () => {
    const nodo = { id: count, next: null };
    setCount(count + 1);
    if (!cabeza) {
      nodo.next = nodo;
      setCabeza(nodo);
      setActual(nodo);
    } else {
      let temp = cabeza;
      while (temp.next !== cabeza) temp = temp.next;
      temp.next = nodo;
      nodo.next = cabeza;
    }
  };

  return (
    <div>
      <button onClick={generar}>Tomar Turno</button>
      <h1>{actual ? "Turno: " + actual.id : "No hay turnos"}</h1>
      <button onClick={() => setActual(actual.next)} disabled={!actual}>Siguiente</button>
    </div>
  );
}
