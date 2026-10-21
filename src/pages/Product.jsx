import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Button, Col, Flex, Image, InputNumber, List, Radio, Result, Row, Typography } from 'antd'
import { formatPrice, getProduct } from '../data/products'
import { useCart } from '../context/CartContext'

export default function Product({ onAdded }) {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [color, setColor] = useState(product?.colors[0] || '')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <Result
        status="404"
        title="This piece is no longer listed"
        extra={
          <Link to="/">
            <Button type="primary">Back to shop</Button>
          </Link>
        }
      />
    )
  }

  const facts = [
    `Estimated delivery: ${product.eta}`,
    `Ships from ${product.shipsFrom}`,
    'This demo does not charge a card or collect duties.',
    'Free worldwide shipping on orders over $100.',
  ]

  return (
    <Row gutter={[32, 24]}>
      <Col xs={24} md={12}>
        <Image src={product.image} alt={product.name} className="pdp-photo" />
      </Col>
      <Col xs={24} md={12}>
        <Breadcrumb
          items={[{ title: <Link to="/">Shop</Link> }, { title: product.category }]}
        />
        <Typography.Title className="serif" level={2}>
          {product.name}
        </Typography.Title>
        <Flex gap={16} align="baseline">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {formatPrice(product.price)}
          </Typography.Title>
          <Typography.Text type="secondary">
            ★ {product.rating} · {product.reviews} reviews
          </Typography.Text>
        </Flex>
        <Typography.Paragraph>{product.details}</Typography.Paragraph>
        <Typography.Text type="secondary">Color / finish</Typography.Text>
        <div style={{ margin: '8px 0 16px' }}>
          <Radio.Group
            optionType="button"
            value={color}
            options={product.colors}
            onChange={(event) => setColor(event.target.value)}
          />
        </div>
        <Flex gap={12} wrap>
          <InputNumber min={1} value={qty} onChange={(value) => setQty(value || 1)} />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              addItem(product, { color, qty })
              onAdded()
            }}
          >
            Add to bag
          </Button>
        </Flex>
        <List
          size="small"
          style={{ marginTop: 24 }}
          dataSource={facts}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Col>
    </Row>
  )
}
