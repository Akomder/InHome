import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Tạo root container để render ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render ứng dụng vào root container
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);