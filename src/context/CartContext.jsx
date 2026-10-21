import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'lumen-cart-v2'
/** 满 $100 免全球运费，否则收一笔固定运费。 */
const FREE_SHIPPING_FROM = 100
const SHIPPING_FEE = 12

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, { color, qty = 1 } = {}) => {
    setItems((current) => {
      // 同一商品的不同颜色分开计件
      const key = `${product.id}__${color}`
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [
        ...current,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color,
          qty,
        },
      ]
    })
  }

  const updateQty = (key, qty) => {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, qty } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }

  const clearCart = () => setItems([])

  const summary = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    return { count, subtotal, shipping, total: subtotal + shipping, FREE_SHIPPING_FROM }
  }, [items])

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, ...summary }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside CartProvider')
  return value
}
