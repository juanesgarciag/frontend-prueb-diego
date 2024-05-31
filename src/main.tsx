import React from 'react'
import ReactDOM from 'react-dom/client'
import { PruebaApp } from './pruebaApp'
import { BrowserRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PruebaApp />
    </BrowserRouter>
  </React.StrictMode>
)

