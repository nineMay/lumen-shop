import { useNavigate } from 'react-router-dom'
import { Card, Flex, Tag, Typography } from 'antd'
import { formatPrice } from '../data/products'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <Card
      hoverable
      onClick={() => navigate(`/product/${product.id}`)}
      cover={
        <div className="card-cover">
          {product.tag && <Tag className="card-tag">{product.tag}</Tag>}
          <img src={product.image} alt={product.name} />
        </div>
      }
    >
      <Typography.Text type="secondary">{product.category}</Typography.Text>
      <Typography.Title level={5} style={{ marginTop: 4 }}>
        {product.name}
      </Typography.Title>
      <Flex justify="space-between">
        <Typography.Text strong>{formatPrice(product.price)}</Typography.Text>
        <Typography.Text type="secondary">★ {product.rating}</Typography.Text>
      </Flex>
    </Card>
  )
}
