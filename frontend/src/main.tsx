import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './UserContext';
import { BrowserRouter } from 'react-router';
import './i18n.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
