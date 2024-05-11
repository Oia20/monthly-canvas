import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './login.jsx';
import RegisterForm from './register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>

      <Routes>

        <Route path="/monthly-canvas" element={<App />} />
        <Route path="/monthly-canvas/login" element={<LoginForm />} />
        <Route path="/monthly-canvas/Register" element={<RegisterForm />} />
        
      </Routes>
    </React.StrictMode>
  </Router>
);
