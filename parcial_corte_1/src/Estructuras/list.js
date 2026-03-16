export class Nodo {
  constructor(id, nombre, nivel, fecha = Date.now()) {
    this.id = id;
    this.nombre = nombre;
    this.nivel = parseInt(nivel, 10);
    this.fecha = fecha;
  }
}

export class ColaPrioridad {
  #heap = [];

  constructor(datos = []) {
    if (datos.length > 0) {
      this.#heap = [...datos];
      this.#construirHeap();
    }
  }

  #construirHeap() {
    for (let i = Math.floor(this.#heap.length / 2) - 1; i >= 0; i--) {
      this.#hundir(i);
    }
  }

  #comparar(a, b) {
    if (a.nivel === b.nivel) return a.fecha - b.fecha;
    return a.nivel - b.nivel;
  }

  insertar(p) {
    this.#heap.push(p);
    this.#subir(this.#heap.length - 1);
  }

  extraerMin() {
    if (this.#heap.length === 0) return null;
    if (this.#heap.length === 1) return this.#heap.pop();
    const raiz = this.#heap[0];
    this.#heap[0] = this.#heap.pop();
    this.#hundir(0);
    return raiz;
  }

  #subir(i) {
    let act = i;
    while (act > 0) {
      let p = Math.floor((act - 1) / 2);
      if (this.#comparar(this.#heap[act], this.#heap[p]) >= 0) break;
      this.#swap(act, p);
      act = p;
    }
  }

  #hundir(i) {
    let len = this.#heap.length, act = i;
    while (true) {
      let iz = 2 * act + 1, de = 2 * act + 2, m = act;
      if (iz < len && this.#comparar(this.#heap[iz], this.#heap[m]) < 0) m = iz;
      if (de < len && this.#comparar(this.#heap[de], this.#heap[m]) < 0) m = de;
      if (m === actual) break;
      this.#swap(act, m);
      act = m;
    }
  }

  #swap(i, j) { [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]]; }

  estaVacia() { return this.#heap.length === 0; }

  obtenerSnapshot() {
    const clon = new ColaPrioridad(this.#heap);
    const res = [];
    while (!clon.estaVacia()) res.push(clon.extraerMin());
    return res;
  }
}
