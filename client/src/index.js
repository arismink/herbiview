import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';

import Theme from './styles/Theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme = { Theme }>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ThemeProvider>
    
  </React.StrictMode>
);
