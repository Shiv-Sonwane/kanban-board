import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import Column from "./components/Column";
import { moveCard, undo, redo, addCard, deleteCard } from "./store/boardSlice";
import useDebounce from "./hooks/useDebounce";


function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [conflictMsg, setConflictMsg] = useState("");

  // Persisted theme
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  const data = useSelector((state) => state.board.present.data);
  const dispatch = useDispatch();

  //theme globally
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.backgroundColor = dark ? "#1e1e1e" : "#ffffff";
  }, [dark]);

  //Drag & Drop
  const handleDrop = useCallback(
    (e, toColumn) => {
      const cardId = Number(e.dataTransfer.getData("cardId"));
      const fromColumn = e.dataTransfer.getData("fromColumn");

      dispatch(moveCard({ cardId, fromColumn, toColumn }));
      setDraggingCardId(null);
    },
    [dispatch],
  );

  //Add Card
  const handleAddCard = useCallback(
    (column, title) => {
      if (!title) return;
      dispatch(addCard({ column, title }));
    },
    [dispatch],
  );

  const handleDeleteCard = useCallback(
    (column, cardId) => {
      dispatch(deleteCard({ column, cardId }));
    },
    [dispatch],
  );

  //Undo / Redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch(undo());
      }

      if (e.ctrlKey && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch(redo());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // Debounce Search
  const debouncedSearch = useDebounce(search, 300);

  //Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const columns = ["todo", "inProgress", "done"];
      const fromColumn = columns[Math.floor(Math.random() * columns.length)];
      const cards = data[fromColumn];

      if (!cards || cards.length === 0) return;

      const randomCard = cards[Math.floor(Math.random() * cards.length)];

      let toColumn = fromColumn;
      while (toColumn === fromColumn) {
        toColumn = columns[Math.floor(Math.random() * columns.length)];
      }

      if (draggingCardId && randomCard.id === draggingCardId) {
        setConflictMsg("⚠️ Conflict: card moved by another user!");
        setTimeout(() => setConflictMsg(""), 2000);
        return;
      }

      dispatch(
        moveCard({
          cardId: randomCard.id,
          fromColumn,
          toColumn,
        }),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [data, dispatch, draggingCardId]);

  // Filter
  const filterCards = (cards) => {
    return cards.filter((card) =>
      card.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  };

  const filteredTodo = useMemo(
    () => filterCards(data.todo),
    [data.todo, debouncedSearch],
  );

  const filteredInProgress = useMemo(
    () => filterCards(data.inProgress),
    [data.inProgress, debouncedSearch],
  );

  const filteredDone = useMemo(
    () => filterCards(data.done),
    [data.done, debouncedSearch],
  );

  return (
    <div
      style={{
        background: dark ? "#1e1e1e" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
    
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0 }}>Kanban Board</h1>

          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "6px",
              border: "none",
              background: dark ? "#444" : "#ddd",
              color: dark ? "#fff" : "#000",
              transition: "all 0.2s ease",
            }}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        
        {conflictMsg && (
          <div
            style={{
              background: "red",
              color: "white",
              padding: "8px",
              marginBottom: "10px",
            }}
          >
            {conflictMsg}
          </div>
        )}

        
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            marginBottom: "20px",
          }}
        />

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Column
            title="Todo"
            columnKey="todo"
            cards={filteredTodo}
            onDrop={handleDrop}
            search={debouncedSearch}
            setDraggingCardId={setDraggingCardId}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            dark={dark}
          />

          <Column
            title="In Progress"
            columnKey="inProgress"
            cards={filteredInProgress}
            onDrop={handleDrop}
            search={debouncedSearch}
            setDraggingCardId={setDraggingCardId}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            dark={dark}
          />

          <Column
            title="Done"
            columnKey="done"
            cards={filteredDone}
            onDrop={handleDrop}
            search={debouncedSearch}
            setDraggingCardId={setDraggingCardId}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            dark={dark}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
