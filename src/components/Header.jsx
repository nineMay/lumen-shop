import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Drawer, Flex, Grid, Input, Layout, Menu } from 'antd'
import { MenuOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useCart } from '../context/CartContext'

const links = [
  { key: 'shop', label: 'Shop', path: '/' },
  { key: 'kitchen', label: 'Kitchen', path: '/?cat=Kitchen' },
  { key: 'travel', label: 'Travel', path: '/?cat=Travel' },
  { key: 'bag', label: 'Bag', path: '/cart' },
]

export default function Header({ onOpenCart }) {
  const { count } = useCart()
  const screens = Grid.useBreakpoint()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <Layout.Header className="site-header">
      {!screens.md && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        />
      )}
      <button className="brand" type="button" onClick={() => go('/')}>
        Lumen
      </button>
      {screens.md && (
        <Flex gap={4}>
          {links.map((item) => (
            <Button key={item.key} type="text" onClick={() => go(item.path)}>
              {item.label}
            </Button>
          ))}
        </Flex>
      )}
      <Input.Search
        allowClear
        placeholder="Search objects"
        aria-label="Search products"
        className="header-search"
        onSearch={(value) => {
          const q = value.trim()
          go(q ? `/?q=${encodeURIComponent(q)}` : '/')
        }}
      />
      <Badge count={count} color="#b55233">
        <Button
          shape="circle"
          icon={<ShoppingOutlined />}
          aria-label="Open shopping bag"
          onClick={onOpenCart}
        />
      </Badge>
      <Drawer title="Lumen" placement="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Menu
          mode="inline"
          selectable={false}
          items={links.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => go(item.path),
          }))}
        />
      </Drawer>
    </Layout.Header>
  )
}
