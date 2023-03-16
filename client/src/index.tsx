import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
// import { createBrowserHistory } from "history"; 
import { NtStoreProvider } from "./app/context/NtStoreContextValue";
import {configureStore} from './app/store/configureStore';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { Provider } from "react-redux";

const store =configureStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NtStoreProvider>
      <Provider store={store}>
      <RouterProvider router={router}/>  
      </Provider>   
    </NtStoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
