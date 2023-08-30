import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodItems: null,
};

const dataSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },
  },
});

export const { setFoodItems } = dataSlice.actions;
export default dataSlice.reducer;
