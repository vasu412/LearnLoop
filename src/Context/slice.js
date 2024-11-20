import { createSlice } from "@reduxjs/toolkit";

const updaterSlice = createSlice({
  name: "updateData",
  initialState: 0,
  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});

export const { update } = updaterSlice.actions;
export default updaterSlice.reducer;
