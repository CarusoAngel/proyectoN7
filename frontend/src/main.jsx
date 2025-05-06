import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.jsx'; // 👈

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Router />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
