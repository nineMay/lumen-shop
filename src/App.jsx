import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout, Typography } from 'antd'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ScrollToTop />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Layout.Content className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product onAdded={() => setCartOpen(true)} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Lumen · demo shop for overseas shoppers · USD · ships worldwide
          <br />
          No login, no real payment. The bag is stored in this browser only.
        </Typography.Paragraph>
      </Layout.Footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Layout>
  )
}
