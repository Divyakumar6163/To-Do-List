import { configureStore } from "@reduxjs/toolkit";

import taskSliceReducer from "./task-redux.jsx";

const store = configureStore({
  reducer: {
    task: taskSliceReducer,
  },
});
export default store;