import React, { useState, useEffect } from 'react';

const n1 = { id: 1, nombre: "Producto A" };
const n2 = { id: 2, nombre: "Producto B" };
const n3 = { id: 3, nombre: "Producto C" };

n1.next = n2; n1.prev = n3;
n2.next = n3; n2.prev = n1;
n3.next = n1; n3.prev = n2;

export default function Carrusel() {
  const [actual, setActual] = useState(n1);

  useEffect(() => {
    const timer = setInterval(() => setActual(prev => prev.next), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{actual.nombre}</h2>
      <button onClick={() => setActual(actual.prev)}>Ant</button>
      <button onClick={() => setActual(actual.next)}>Sig</button>
    </div>
  );
}
