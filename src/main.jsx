import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import { router } from './Route/route.jsx';
import { LanguageProvider } from './hooks/useLanguage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
  <RouterProvider router={router} />
    </LanguageProvider>
    
   
  </StrictMode>,
)
