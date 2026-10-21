import { Link } from 'react-router-dom'
import { Button, Card, Col, Empty, Flex, InputNumber, List, Row, Typography } from 'antd'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import OrderTotals from '../components/OrderTotals'

export default function Cart() {
  const { items, updateQty, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <Empty description="Your bag is empty">
        <Link to="/">
          <Button type="primary">Continue shopping</Button>
        </Link>
      </Empty>
    )
  }

  return (
    <Flex vertical gap={16}>
      <Typography.Title className="serif" level={2}>
        Bag
      </Typography.Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={15}>
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
                  avatar={
                    <Link to={`/product/${item.id}`}>
                      <img className="line-thumb" src={item.image} alt={item.name} />
                    </Link>
                  }
                  title={<Link to={`/product/${item.id}`}>{item.name}</Link>}
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
        </Col>
        <Col xs={24} md={9}>
          <Card title="Order summary">
            <Flex vertical gap={16}>
              <OrderTotals />
              <Link to="/checkout">
                <Button type="primary" size="large" block>
                  Checkout
                </Button>
              </Link>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Flex>
  )
}
