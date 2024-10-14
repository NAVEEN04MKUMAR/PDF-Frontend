import { React } from 'react'
import { ReactDOM } from 'react-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const rootelement=document.getElementById('app');

const root=createRoot(rootelement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
