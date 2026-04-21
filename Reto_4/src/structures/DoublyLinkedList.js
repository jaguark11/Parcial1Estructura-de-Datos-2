class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  next() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current?.value;
  }

  prev() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current?.value;
  }

  getCurrent() {
    return this.current?.value;
  }
}