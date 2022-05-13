import React from 'react';
import ReactDOM from "react-dom/client";
import './index.scss';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';

import Theme from './styles/Theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme = { Theme }>
      <App />
    </ThemeProvider>
    
  </React.StrictMode>
);
