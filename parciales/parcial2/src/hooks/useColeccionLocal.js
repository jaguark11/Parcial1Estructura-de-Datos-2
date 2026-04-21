import { useState, useEffect } from 'react';
import { ArbolBinario, Nodo, semilla_data } from '../core/tree_logic';

const useColeccionLocal = (coleccion, correo) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const local = localStorage.getItem(coleccion);
    setResults(local ? JSON.parse(local) : semilla_data);
    setIsPending(false);
  }, [coleccion]);

  const add = (nom, tip, pId = null) => {
    const copia = [...results];
    const tree = new ArbolBinario(copia);
    tree.insertar(new Nodo(nom, tip, correo, pId));
    setResults(copia);
    localStorage.setItem(coleccion, JSON.stringify(copia));
  };

  const remove = (id) => {
    const copia = [...results];
    const tree = new ArbolBinario(copia);
    tree.borrar(copia, id);
    setResults(copia);
    localStorage.setItem(coleccion, JSON.stringify(copia));
  };

  return { results, isPending, add, remove };
};

export default useColeccionLocal;