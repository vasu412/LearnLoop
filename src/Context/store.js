import { configureStore } from "@reduxjs/toolkit";
import updaterReducer from "./slice";
const store = configureStore({
  reducer: {
    updater: updaterReducer,
  },
});
export default store;
