import { useEffect, useState } from "react";
import LinkedList from "../structures/LinkedList";

export default function LinkedPage() {
  const [playlist] = useState(new LinkedList());
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    playlist.append("Luma");
    playlist.append("Quizas");
    playlist.append("Torero");
    playlist.append("Rechazame");

    setCurrent(playlist.head);
  }, [playlist]);

  const nextSong = () => {
    if (current && current.next) {
      setCurrent(current.next);
    }
  };

  const prevSong = () => {
    if (!current || current === playlist.head) return;

    let temp = playlist.head;

    while (temp.next !== current) {
      temp = temp.next;
    }

    setCurrent(temp);
  };

  return (
    <div>
      <h2>Linked List - Playlist</h2>

      {current && (
        <h3>Reproduciendo: {current.value}</h3>
      )}

      <button onClick={prevSong}>Back</button>
      <button onClick={nextSong}>Next</button>
    </div>
  );
}