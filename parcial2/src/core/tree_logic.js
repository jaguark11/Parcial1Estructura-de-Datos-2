export class Nodo {
  constructor(valor, tipo, email, id_padre = null) {
    this.id = Math.random().toString(36).substring(2, 9);
    this.nombre = valor;
    this.tipo = tipo; 
    this.creador = email;
    this.parentId = id_padre;
    //carpetas tienen [], archivos null
    this.hijos = tipo === 'folder' ? [] : null;
    this.fecha = new Date().toISOString();
  }
}

export class ArbolBinario { 
  constructor(raiz = []) {
    this.raiz = raiz;
  }

  // Busqueda BFS/DFS simplificada
  buscar(nodos, id_buscado) {
    for (let n of nodos) {
      if (n.id === id_buscado) return n;
      if (n.hijos) {
        let r = this.buscar(n.hijos, id_buscado);
        if (r) return r;
      }
    }
    return null;
  }

  insertar(nuevo_nodo) {
    if (!nuevo_nodo.parentId) {
      this.raiz.push(nuevo_nodo);
    } else {
      let padre = this.buscar(this.raiz, nuevo_nodo.parentId);
      if (padre && padre.tipo === 'folder') {
        padre.hijos.push(nuevo_nodo);
      }
    }
  }

  borrar(nodos, id_borrar) {
    for (let i = 0; i < nodos.length; i++) {
      if (nodos[i].id === id_borrar) {
        nodos.splice(i, 1);
        return true;
      }
      if (nodos[i].hijos) this.borrar(nodos[i].hijos, id_borrar);
    }
  }
}

export const semilla_data = [
  new Nodo("Entregas_UAO", "folder", "kristian@uao.edu.co"),
  new Nodo("config.txt", "file", "admin@uao.edu.co")
];