export class Persona {
  #sig = null;

  constructor(id, nombre, monto, fecha_llegada) {
    this.id = id || crypto.randomUUID();
    this.nombre = nombre.trim();
    this.monto = parseFloat(monto);
    this.fecha_llegada = new Date(fecha_llegada);
    
    if (isNaN(this.monto) || this.monto <= 0) throw new Error("Monto inválido");
  }

  setSiguiente(nodo) { this.#sig = nodo; }
  getSiguiente() { return this.#sig; }
}

export class ColaATM {
  #cabeza = null;
  #tam = 0;

  encolar(nueva_persona) {
    if (!this.#cabeza || this.#esAntes(nueva_persona, this.#cabeza)) {
      nueva_persona.setSiguiente(this.#cabeza);
      this.#cabeza = nueva_persona;
    } else {
      let aux = this.#cabeza;
      while (aux.getSiguiente() && this.#esAntes(aux.getSiguiente(), nueva_persona)) {
        aux = aux.getSiguiente();
      }
      nueva_persona.setSiguiente(aux.getSiguiente());
      aux.setSiguiente(nueva_persona);
    }
    this.#tam++;
  }

  #esAntes(p1, p2) {
    const t1 = p1.fecha_llegada.getTime();
    const t2 = p2.fecha_llegada.getTime();
    if (t1 !== t2) return t1 < t2;
    return p1.id < p2.id; // Tie-breaker determinista
  }

  atender() {
    if (!this.#cabeza) return null;
    const atendido = this.#cabeza;
    this.#cabeza = this.#cabeza.getSiguiente();
    this.#tam--;
    return atendido;
  }

  exportar_datos() {
    const lista = [];
    let aux = this.#cabeza;
    while (aux) {
      lista.push({
        id: aux.id,
        nombre: aux.nombre,
        monto: aux.monto,
        fecha_llegada: aux.fecha_llegada.toISOString()
      });
      aux = aux.getSiguiente();
    }
    return lista;
  }

  get longitud() { return this.#tam; }
}
