import { createContext, useContext, useState, useEffect } from 'react';
import { FileSystemManager, seed, FileNode } from '../core/tree_logic';

const Contexto = createContext();

export const ProveedorArchivos = ({ children, emailUsuario }) => {
  const [datos, setDatos] = useState(() => {
    const s = localStorage.getItem('arbol_v2');
    return s ? JSON.parse(s) : seed;
  });

  useEffect(() => {
    const sync = (e) => { if (e.key === 'arbol_v2') setDatos(JSON.parse(e.newValue)); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const crear = (n, t, p = null) => {
    const copia = [...datos];
    const m = new FileSystemManager(copia);
    m.agregar(new FileNode(n, t, emailUsuario, p));
    setDatos(copia);
    localStorage.setItem('arbol_v2', JSON.stringify(copia));
  };

  const borrar = (id) => {
    const copia = [...datos];
    const m = new FileSystemManager(copia);
    m.borrar(copia, id);
    setDatos(copia);
    localStorage.setItem('arbol_v2', JSON.stringify(copia));
  };

  return (
    <Contexto.Provider value={{ arbol: datos, crear, borrar }}>
      {children}
    </Contexto.Provider>
  );
};

export const usarArchivos = () => useContext(Contexto);