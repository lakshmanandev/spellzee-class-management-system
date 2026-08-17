import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import './styles.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><AuthProvider><NotificationProvider><App/><Toaster position="top-right" toastOptions={{ duration: 3800, style: { borderRadius: '14px', padding: '14px 16px', fontWeight: 600, boxShadow: '0 18px 48px rgba(17,24,55,.16)' } }}/></NotificationProvider></AuthProvider></BrowserRouter></React.StrictMode>);
