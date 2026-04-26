import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const saved = localStorage.getItem("kanban-data");
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    if (parsed.past && parsed.present && parsed.future) {
      return parsed;
    }

    if (
      parsed &&
      parsed.data &&
      parsed.data.todo &&
      parsed.data.inProgress &&
      parsed.data.done
    ) {
      return {
        past: [],
        present: parsed,
        future: [],
      };
    }

    return null;
  } catch (e) {
    return null;
  }
};

const initialState = loadState() || {
  past: [],
  present: {
    data: {
      todo: [
        { id: 1, title: "Buy groceries" },
        { id: 2, title: "Call plumber" },
        { id: 3, title: "Schedule doctor appointment" },
        { id: 4, title: "Pay electricity bill" },
        { id: 5, title: "Clean room" },
        { id: 6, title: "Do laundry" },
        { id: 7, title: "Plan weekend trip" },
        { id: 8, title: "Read a book" },
        { id: 9, title: "Workout for 30 minutes" },
        { id: 10, title: "Prepare lunch" },
        { id: 11, title: "Water plants" },
        { id: 12, title: "Check emails" },
        { id: 13, title: "Update resume" },
        { id: 14, title: "Learn new skill" },
        { id: 15, title: "Backup files" },
        { id: 16, title: "Clean kitchen" },
        { id: 17, title: "Organize desk" },
        { id: 18, title: "Fix light bulb" },
        { id: 19, title: "Call friend" },
        { id: 20, title: "Review expenses" },
        { id: 21, title: "Meditate" },
        { id: 22, title: "Take out trash" },
        { id: 23, title: "Write journal" },
        { id: 24, title: "Plan next week" },
        { id: 25, title: "Update calendar" },
        { id: 26, title: "Pay rent" },
        { id: 27, title: "Cook dinner" },
        { id: 28, title: "Watch tutorial" },
        { id: 29, title: "Sort documents" },
        { id: 30, title: "Charge devices" },
      ],

      inProgress: [
        { id: 31, title: "Working on project report" },
        { id: 32, title: "Preparing presentation" },
        { id: 33, title: "Fixing bike" },
        { id: 34, title: "Studying for exam" },
        { id: 35, title: "Writing blog post" },
        { id: 36, title: "Learning React concepts" },
        { id: 37, title: "Cooking dinner" },
        { id: 38, title: "Cleaning house" },
        { id: 39, title: "Updating portfolio" },
        { id: 40, title: "Replying to emails" },
        { id: 41, title: "Planning trip budget" },
        { id: 42, title: "Working out" },
        { id: 43, title: "Reading documentation" },
        { id: 44, title: "Fixing bugs" },
        { id: 45, title: "Organizing files" },
        { id: 46, title: "Shopping online" },
        { id: 47, title: "Booking tickets" },
        { id: 48, title: "Setting up meeting" },
        { id: 49, title: "Practicing coding" },
        { id: 50, title: "Preparing notes" },
        { id: 51, title: "Editing photos" },
        { id: 52, title: "Recording video" },
        { id: 53, title: "Designing layout" },
        { id: 54, title: "Testing features" },
        { id: 55, title: "Fixing UI issues" },
        { id: 56, title: "Reviewing work" },
        { id: 57, title: "Learning new topic" },
        { id: 58, title: "Updating app" },
        { id: 59, title: "Debugging code" },
        { id: 60, title: "Improving performance" },
      ],

      done: [
        { id: 61, title: "Woke up early" },
        { id: 62, title: "Morning workout" },
        { id: 63, title: "Had breakfast" },
        { id: 64, title: "Checked emails" },
        { id: 65, title: "Completed assignment" },
        { id: 66, title: "Cleaned room" },
        { id: 67, title: "Finished meeting" },
        { id: 68, title: "Paid bills" },
        { id: 69, title: "Called parents" },
        { id: 70, title: "Read articles" },
        { id: 71, title: "Watched tutorial" },
        { id: 72, title: "Fixed minor bugs" },
        { id: 73, title: "Updated code" },
        { id: 74, title: "Submitted work" },
        { id: 75, title: "Prepared notes" },
        { id: 76, title: "Organized files" },
        { id: 77, title: "Completed shopping" },
        { id: 78, title: "Cooked meal" },
        { id: 79, title: "Cleaned kitchen" },
        { id: 80, title: "Finished workout" },
        { id: 81, title: "Backed up data" },
        { id: 82, title: "Planned schedule" },
        { id: 83, title: "Reviewed tasks" },
        { id: 84, title: "Updated calendar" },
        { id: 85, title: "Completed reading" },
        { id: 86, title: "Sent emails" },
        { id: 87, title: "Fixed issues" },
        { id: 88, title: "Improved UI" },
        { id: 89, title: "Tested features" },
        { id: 90, title: "Ready for tomorrow" },
      ],
    },
  },
  future: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    moveCard: (state, action) => {
      const { cardId, fromColumn, toColumn } = action.payload;

      if (fromColumn === toColumn) return;

      state.past.push(JSON.parse(JSON.stringify(state.present)));

      const card = state.present.data[fromColumn].find((c) => c.id === cardId);

      state.present.data[fromColumn] = state.present.data[fromColumn].filter(
        (c) => c.id !== cardId,
      );

      state.present.data[toColumn].push(card);

      state.future = [];
    },

    undo: (state) => {
      if (state.past.length === 0) return;

      const previous = state.past.pop();

      state.future.unshift(state.present);
      state.present = previous;
    },

    redo: (state) => {
      if (state.future.length === 0) return;

      const next = state.future.shift();

      state.past.push(state.present);
      state.present = next;
    },

    addCard: (state, action) => {
      const { column, title } = action.payload;

      state.past.push(JSON.parse(JSON.stringify(state.present)));

      state.present.data[column].push({
        id: Date.now(),
        title,
      });

      state.future = [];
    },
    deleteCard: (state, action) => {
      const { column, cardId } = action.payload;

      state.past.push(JSON.parse(JSON.stringify(state.present)));

      state.present.data[column] = state.present.data[column].filter(
        (c) => c.id !== cardId,
      );

      state.future = [];
    },
  },
});

export const { moveCard, undo, redo, addCard, deleteCard } = boardSlice.actions;
export default boardSlice.reducer;
