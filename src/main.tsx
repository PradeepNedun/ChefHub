  import React from "react";
  import ReactDOM from "react-dom/client";
  import { RouteFiles } from "./Router.tsx";
  import { Provider } from "react-redux";
  import { store } from "./store";
  import { BrowserRouter } from "react-router-dom";
  import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
       <RouteFiles />
     </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

  