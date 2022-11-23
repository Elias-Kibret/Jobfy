import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Link } from "react-router-dom";
import 'normalize.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)
