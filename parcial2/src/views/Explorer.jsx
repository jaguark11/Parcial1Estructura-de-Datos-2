import { useState } from 'react';
import useColeccionLocal from '../hooks/useColeccionLocal';

const NodoVista = ({ item, hook }) => {
  const [open, setOpen] = useState(false);
  const { add, remove } = hook;

  return (
    <div className="nodo-arbol">
      <div className="fila-info">
        {}
        <span onClick={() => setOpen(!open)} style={{ cursor: 'pointer', fontSize: '18px' }}>
          {item.tipo === 'folder' ? (open ? '📂' : '📁') : '📄'}
        </span>
        <span style={{ fontWeight: item.tipo === 'folder' ? 'bold' : 'normal' }}>
          {item.nombre}
        </span>
        
        <button onClick={() => remove(item.id)} className="btn-accion">🗑️</button>
        
        {item.tipo === 'folder' && (
          <>
            <button onClick={() => {
              const n = prompt("Nombre del documento:");
              if(n && n.trim() !== "") add(n, 'file', item.id);
            }} className="btn-accion">+Doc</button>
            <button onClick={() => {
              const n = prompt("Nombre de la carpeta:");
              if(n && n.trim() !== "") add(n, 'folder', item.id);
            }} className="btn-accion">+Carp</button>
          </>
        )}
      </div>
      {open && item.hijos && (
        <div className="sub-arbol">
          {item.hijos.map(h => <NodoVista key={h.id} item={h} hook={hook} />)}
        </div>
      )}
    </div>
  );
};

export const Explorador = ({ usuario }) => {
  const hook = useColeccionLocal('db_parcial', usuario);
  if (hook.isPending) return <p>Cargando...</p>;

  return (
    <div className="contenedor-arbol" style={{ padding: '20px' }}>
      <button onClick={() => {
        const n = prompt("Nombre de la Raíz:");
        if(n && n.trim() !== "") hook.add(n, 'folder');
      }} style={{ padding: '8px', cursor: 'pointer', marginBottom: '15px' }}>
        + Nueva Raíz
      </button>
      
      {hook.results.map(i => <NodoVista key={i.id} item={i} hook={hook} />)}
    </div>
  );
};