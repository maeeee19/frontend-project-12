import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import App from './App.jsx'
import { initWebSocket } from './services/websocket'
import { store } from './store/store'

initWebSocket(store.dispatch)

createRoot(document.getElementById('chat')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
