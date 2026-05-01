import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import './index.css'

// Track page views for SEO (optional - for Google Analytics)
if (import.meta.env.PROD) {
  console.log('EthioHello - Production mode');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
)