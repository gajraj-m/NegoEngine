import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBuyer: {},
  currentNegoObj: {},
  waitingResponse: false,
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
    setWaitingResponse: (state, action) => {
      state.waitingResponse = action.payload;
    },
  },
});

export const { setCurrentBuyer, setCurrentNegoObj, setWaitingResponse } =
  appSlice.actions;

export default appSlice.reducer;
