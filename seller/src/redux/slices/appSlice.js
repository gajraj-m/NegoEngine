import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBuyer: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentBuyer: (state, action) => {
      state.currentBuyer = action.payload;
    },
  },
});

export const { setCurrentBuyer } = appSlice.actions;

export default appSlice.reducer;
