import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppRouterProvider } from "./Providers/route";
import { AuthProvider } from "./Providers/Auth";
import { AppThemeContextProvider } from "./Providers/Theme";
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppThemeContextProvider>
        <CssBaseline>
        <AppRouterProvider />
        </CssBaseline>
      </AppThemeContextProvider>
    </AuthProvider>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
