import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeller: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentSeller: (state, action) => {
      state.currentSeller = action.payload;
    },
  },
});

export const { setCurrentSeller } = appSlice.actions;

export default appSlice.reducer;
