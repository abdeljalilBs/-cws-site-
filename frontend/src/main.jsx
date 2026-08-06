import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. On importe le AuthProvider
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. On enveloppe toute l'application avec */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)