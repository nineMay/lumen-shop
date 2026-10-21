import { Button, Drawer, Empty, Flex, InputNumber, List } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import OrderTotals from './OrderTotals'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem } = useCart()
  const navigate = useNavigate()

  const go = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <Drawer title="Your bag" open={open} onClose={onClose} size={400}>
      {items.length === 0 ? (
        <Empty description="Nothing in the bag yet">
          <Button type="primary" onClick={onClose}>
            Continue shopping
          </Button>
        </Empty>
      ) : (
        <Flex vertical gap={16}>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" key="remove" onClick={() => removeItem(item.key)}>
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<img className="line-thumb" src={item.image} alt="" />}
                  title={item.name}
                  description={
                    <Flex vertical gap={8} align="flex-start">
                      <span>
                        {item.color} · {formatPrice(item.price * item.qty)}
                      </span>
                      <InputNumber
                        min={1}
                        value={item.qty}
                        onChange={(qty) => updateQty(item.key, qty || 1)}
                      />
                    </Flex>
                  }
                />
              </List.Item>
            )}
          />
          <OrderTotals />
          <Button type="primary" size="large" block onClick={() => go('/checkout')}>
            Checkout
          </Button>
          <Button block onClick={() => go('/cart')}>
            View bag
          </Button>
        </Flex>
      )}
    </Drawer>
  )
}
