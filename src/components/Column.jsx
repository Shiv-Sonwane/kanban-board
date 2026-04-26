
import Card from "./Card";
import React, { useState } from "react";

function Column({
  title,
  cards,
  columnKey,
  onDrop,
  search,
  setDraggingCardId,
  onAddCard,
  onDeleteCard,
  dark,
}) {
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  return (
    <div
      role="list"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.style.background = "#e0e0e0";
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.background = dark ? "#2c2c2c" : "#f4f5f7";
      }}
      onDrop={(e) => {
        onDrop(e, columnKey);
        e.currentTarget.style.background = dark ? "#2c2c2c" : "#f4f5f7";
      }}
      style={{
        flex: 1,
        padding: "12px",
        background: dark ? "#2c2c2c" : "#f4f5f7",
        borderRadius: "10px",
        minHeight: "400px",
        transition: "all 0.2s ease",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      
      {showInput ? (
        <div style={{ marginBottom: "10px" }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter card title"
            style={{
              padding: "6px",
              width: "90%",
              marginBottom: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={() => {
              if (!newTitle.trim()) return;

              onAddCard(columnKey, newTitle);
              setNewTitle("");
              setShowInput(false);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowInput(false);
              setNewTitle("");
            }}
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "none",
            background: dark ? "#444" : "#ddd",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          + Add Card
        </button>
      )}

      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          title={card.title}
          columnKey={columnKey}
          search={search}
          setDraggingCardId={setDraggingCardId}
          dark={dark}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
}

export default React.memo(Column);
