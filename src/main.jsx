import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CIMAssistant from './CIMAssistant.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CIMAssistant />
  </StrictMode>
)
