import { useState } from "react";
import LinkedPage from "./pages/LinkedPage";
import DoublyPage from "./pages/DoublyPage";

function App() {
  const [page, setPage] = useState("linked");

  return (
    <div>
      <button onClick={() => setPage("linked")}>Linked List</button>
      <button onClick={() => setPage("doubly")}>Doubly Linked List</button>

      {page === "linked" && <LinkedPage />}
      {page === "doubly" && <DoublyPage />}
    </div>
  );
}

export default App;
