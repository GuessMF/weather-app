import {configureStore} from "@reduxjs/toolkit";
import currCityReducer from "./currCitySlice";

export default configureStore({
  reducer: {
    currCity: currCityReducer,
  },
});
