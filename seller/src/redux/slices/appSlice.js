import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBuyer: {},
  currentNegoObj: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentBuyer: (state, action) => {
      state.currentBuyer = action.payload;
    },
    setCurrentNegoObj: (state, action) => {
      state.currentBuyer = action.payload;
    },
  },
});

export const { setCurrentBuyer, setCurrentNegoObj } = appSlice.actions;

export default appSlice.reducer;
