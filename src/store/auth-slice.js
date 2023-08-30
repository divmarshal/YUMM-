import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      localStorage.clear();
      state.user = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
