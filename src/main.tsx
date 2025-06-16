import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SavedSitesProvider } from './context/savedSites.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SavedSitesProvider>
      <App />
    </SavedSitesProvider>
  </StrictMode>,
)
