import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css'
// import axios from 'axios'
// import customFetch from './utils/customFetch.js'


// fetch('/api/v1/test').then((res)=>res.json()).then((data)=>console.log(data))
// const response = customFetch.get('/test');
// console.log(response);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </React.StrictMode>,
)
