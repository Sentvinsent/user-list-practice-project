import React from "react";
import ReactDOM from "react-dom/client";

//Styles
import "./index.css";

//Components
import App from "./App";

//State management
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
