import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.scss";
import App from "./App";

import AuthProvider from "providers/AuthProvider";
import PlantQueryProvider from "providers/PlantProvider";

import { ThemeProvider } from "@mui/material/styles";

import Theme from "./styles/Theme";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <PlantQueryProvider>

        <CookiesProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </CookiesProvider>

      </PlantQueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
