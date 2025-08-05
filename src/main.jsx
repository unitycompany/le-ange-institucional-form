import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WhatsAppProvider } from './contexts/WhatsAppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WhatsAppProvider>
      <App />
    </WhatsAppProvider>
  </StrictMode>,
)
