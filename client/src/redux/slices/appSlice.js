import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
  sideBarExpand: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSideBarExpand: (state, action) => {
      state.sideBarExpand = action.payload;
    },
  },
});

export const { setAppPage, setSideBarExpand } = appSlice.actions;

export default appSlice.reducer;
