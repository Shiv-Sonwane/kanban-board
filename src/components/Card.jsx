import React from "react";
import { Trash2 } from "lucide-react";

function highlightText(text, search) {
  if (!search) return text;

  const parts = text.split(new RegExp(`(${search})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} style={{ background: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
function Card({
  title,
  card,
  columnKey,
  search,
  setDraggingCardId,
  dark,
  onDeleteCard,
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("fromColumn", columnKey);

    setDraggingCardId(card.id);
  };

  const handleDragEnd = () => {
    setDraggingCardId(null);
  };

  return (
    <div
      draggable
      role="listitem"
      tabIndex={0}
      aria-grabbed="false"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          alert("Card opened");
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      }}
      style={{
        padding: "10px",
        margin: "8px 0",
        background: dark ? "#3a3a3a" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "grab",
        transition: "all 0.2s ease",
      }}
    >
      {highlightText(title, search)}
      <button
        onClick={() => onDeleteCard(columnKey, card.id)}
        style={{
          float: "right",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "2px",
        }}
      >
        <Trash2 size={16} color={dark ? "#ff6b6b" : "#d11a2a"} />
      </button>
    </div>
  );
}

export default React.memo(Card);
