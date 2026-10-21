import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Empty, Flex, Form, Input, Result, Row, Select, Typography } from 'antd'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

const countries = ['United States', 'United Kingdom', 'Germany', 'Japan', 'Australia', 'Singapore']

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [orderId, setOrderId] = useState('')

  if (orderId) {
    return (
      <Result
        status="success"
        title="Order placed (demo)"
        subTitle={`Reference ${orderId}. Nothing was charged and nothing will ship.`}
        extra={
          <Link to="/">
            <Button type="primary">Back to shop</Button>
          </Link>
        }
      />
    )
  }

  if (items.length === 0) {
    return (
      <Empty description="Your bag is empty">
        <Link to="/">
          <Button type="primary">Shop first</Button>
        </Link>
      </Empty>
    )
  }

  return (
    <Flex vertical gap={8}>
      <Typography.Title className="serif" level={2}>
        Checkout
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Demo only — no card is collected.
      </Typography.Paragraph>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Form
            layout="vertical"
            requiredMark
            initialValues={{ country: 'United States' }}
            onFinish={() => {
              setOrderId(`LM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
              clearCart()
            }}
          >
            <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country" rules={[{ required: true }]}>
              <Select options={countries.map((value) => ({ value, label: value }))} />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Place order · {formatPrice(total)}
            </Button>
          </Form>
        </Col>
        <Col xs={24} md={10}>
          <Card title="In this order">
            {items.map((item) => (
              <Flex key={item.key} justify="space-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </Flex>
            ))}
            <Flex justify="space-between" style={{ marginTop: 12 }}>
              <Typography.Text strong>Total</Typography.Text>
              <Typography.Text strong>{formatPrice(total)}</Typography.Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Flex>
  )
}
