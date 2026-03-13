export class Person {
  #next = null; 

  constructor(id, name, amount, arrivalDate) {
    this.id = id || crypto.randomUUID();
    this.name = this.#validarNom(name);
    this.amount = this.#validarCant(amount);
    this.arrivalDate = arrivalDate ? new Date(arrivalDate) : new Date();
  }

  #validarNom(n) {
    const limpio = String(n || "").trim();
    if (limpio.length < 2) throw new Error("Nombre muy corto");
    return limpio;
  }

  #validarCant(a) {
    const val = parseFloat(a);
    if (!Number.isFinite(val) || val <= 0) throw new Error("Monto no permitido");
    return val;
  }

  getNext() { return this.#next; }
  setNext(nodo) { this.#next = nodo; }
}

export class SortedATMQueue {
  #head = null;
  #size = 0;
  #ver = Date.now(); 

  enqueue(persona) {
    if (!this.#head || this.#esPrimero(persona, this.#head)) {
      persona.setNext(this.#head);
      this.#head = persona;
    } else {
      let aux = this.#head;
      while (aux.getNext() && this.#esPrimero(aux.getNext(), persona)) {
        aux = aux.getNext();
      }
      persona.setNext(aux.getNext());
      aux.setNext(persona);
    }
    this.#size++;
    this.#ver = Date.now();
  }

  #esPrimero(p1, p2) {
    const t1 = p1.arrivalDate.getTime();
    const t2 = p2.arrivalDate.getTime();
    if (t1 !== t2) return t1 < t2;
    return p1.id < p2.id; // Tie-breaker determinista por ID
  }

  dequeue() {
    if (!this.#head) return null;
    const nodo = this.#head;
    this.#head = this.#head.getNext();
    this.#size--;
    this.#ver = Date.now();
    return nodo;
  }

  toArray() {
    const lista = [];
    let aux = this.#head;
    while (aux) {
      lista.push({
        id: aux.id,
        name: aux.name,
        amount: aux.amount,
        arrivalDate: aux.arrivalDate.toISOString()
      });
      aux = aux.getNext();
    }
    return { version: this.#ver, data: lista };
  }

  get length() { return this.#size; }
}
