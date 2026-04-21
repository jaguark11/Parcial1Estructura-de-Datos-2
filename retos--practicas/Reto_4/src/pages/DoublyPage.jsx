 import { useEffect, useState } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";

export default function DoublyPage() {
  const [current, setCurrent] = useState("");
  const [list] = useState(new DoublyLinkedList());

  useEffect(() => {
    list.append("Google");
    list.append("YouTube");
    list.append("GitHub");
    list.append("Gmail");

    setCurrent(list.getCurrent());
  }, [list]);

  const goNext = () => {
    setCurrent(list.next());
  };

  const goPrev = () => {
    setCurrent(list.prev());
  };

  return (
    <div>
      <h2>Doubly Linked List - Browser</h2>
      <h3>Current Page: {current}</h3>
      <button onClick={goPrev}>Back</button>
      <button onClick={goNext}>Forward</button>
    </div>
  );
}