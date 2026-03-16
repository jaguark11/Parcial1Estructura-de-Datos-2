export class Person {
  #next = null;
  constructor(id, name, amount, arrivalDate) {
    this.id = id || crypto.randomUUID();
    this.name = this.#validateName(name);
    this.amount = this.#validateAmount(amount);
    this.arrivalDate = arrivalDate ? new Date(arrivalDate) : new Date();
  }
  #validateName(n) {
    const clean = String(n || "").trim();
    if (clean.length < 2) throw new Error("Nombre inválido");
    return clean;
  }
  #validateAmount(a) {
    const val = parseFloat(a);
    if (!Number.isFinite(val) || val <= 0) throw new Error("Monto inválido");
    return val;
  }
  getNext() { return this.#next; }
  setNext(node) { this.#next = node; }
}

export class SortedQueue {
  #head = null;
  #size = 0;
  #lastUpdate = Date.now();
  enqueue(person) {
    if (!this.#head || this.#isFirst(person, this.#head)) {
      person.setNext(this.#head);
      this.#head = person;
    } else {
      let curr = this.#head;
      while (curr.getNext() && this.#isFirst(curr.getNext(), person)) {
        curr = curr.getNext();
      }
      person.setNext(curr.getNext());
      curr.setNext(person);
    }
    this.#size++;
    this.#lastUpdate = Date.now();
  }
  #isFirst(p1, p2) {
    const t1 = p1.arrivalDate.getTime();
    const t2 = p2.arrivalDate.getTime();
    if (t1 !== t2) return t1 < t2;
    return p1.id < p2.id;
  }
  dequeue() {
    if (!this.#head) return null;
    const node = this.#head;
    this.#head = this.#head.getNext();
    this.#size--;
    this.#lastUpdate = Date.now();
    return node;
  }
  toArray() {
    const list = [];
    let curr = this.#head;
    while (curr) {
      list.push({
        id: curr.id,
        name: curr.name,
        amount: curr.amount,
        arrivalDate: curr.arrivalDate.toISOString()
      });
      curr = curr.getNext();
    }
    return { version: this.#lastUpdate, data: list };
  }
  get length() { return this.#size; }
}
