import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("kanban-data", JSON.stringify(state.board));
  } catch (e) {
    console.error("Could not save state", e);
  }
});