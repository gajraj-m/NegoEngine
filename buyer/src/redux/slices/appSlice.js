import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeller: {},
  waitingResponse: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentSeller: (state, action) => {
      state.currentSeller = action.payload;
    },
    setWaitingResponse: (state, action) => {
      state.waitingResponse = action.payload;
    },
  },
});

export const { setCurrentSeller, setWaitingResponse } = appSlice.actions;

export default appSlice.reducer;
