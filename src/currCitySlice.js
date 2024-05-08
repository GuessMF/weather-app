import {createSlice} from "@reduxjs/toolkit";

export const currCitySlice = createSlice({
  name: "currCity",
  initialState: null,
  reducers: {
    setCurrCity: (state, action) => {
      return action.payload;
    },
  },
});

export const {setCurrCity} = currCitySlice.actions;

export const selectCurrCity = (state) => state.currCity;

export default currCitySlice.reducer;
