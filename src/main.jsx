import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App as AntApp, ConfigProvider } from 'antd'
import { CartProvider } from './context/CartContext.jsx'
import { theme } from './theme.js'
import App from './App.jsx'
import 'antd/dist/reset.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <AntApp>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)
