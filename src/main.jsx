import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ShareContext from './contextshare/ShareContext.jsx'
import RouteGaurdContext from './contextshare/RouteGaurdContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="923410492577-b058at2lfpfc2c2li8hkh025ik1p4ogr.apps.googleusercontent.com">


        <ShareContext> <RouteGaurdContext> <App /></RouteGaurdContext></ShareContext>

      </GoogleOAuthProvider>

    </BrowserRouter>

  </StrictMode>,
)
