import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: defaultState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      console.log(state.tasks);
      console.log(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task, index) => index !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      state.tasks[action.payload.index] = action.payload.task;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const setTask = taskSlice.actions;
export default taskSlice.reducer;
