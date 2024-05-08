import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import "./assets/style/index.scss";
import {Provider} from "react-redux";

import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
