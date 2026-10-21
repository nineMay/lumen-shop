import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Col, Empty, Flex, Image, Row, Select, Space, Typography } from 'antd'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function Home() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || 'All'
  const sort = params.get('sort') || 'featured'

  const setParam = (key, value, clearValue) => {
    const next = new URLSearchParams(params)
    if (value === clearValue) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    let next = products.filter((item) => {
      const inCat = cat === 'All' || item.category === cat
      const inSearch =
        !term ||
        [item.name, item.blurb, item.category].some((field) => field.toLowerCase().includes(term))
      return inCat && inSearch
    })
    if (sort === 'price-asc') next = [...next].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') next = [...next].sort((a, b) => b.price - a.price)
    if (sort === 'rating') next = [...next].sort((a, b) => b.rating - a.rating)
    return next
  }, [q, cat, sort])

  return (
    <Flex vertical gap={24}>
      {!q && (
        <Row gutter={[32, 24]} align="middle">
          <Col xs={24} md={12}>
            <Typography.Text type="secondary">
              Ships worldwide · USD · No account needed
            </Typography.Text>
            <Typography.Title className="serif">
              Objects for a quieter home, packed for overseas.
            </Typography.Title>
            <Typography.Paragraph>
              A small edit of kitchen, travel, and living pieces. Prices in dollars, a
              real shipping window, and a bag that stays in this browser.
            </Typography.Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="/images/hero.jpg"
              alt="A light living room"
              preview={false}
              className="hero-photo"
            />
          </Col>
        </Row>
      )}

      <Flex justify="space-between" gap={12} wrap>
        <Space wrap>
          {categories.map((item) => (
            <Button
              key={item}
              type={item === cat ? 'primary' : 'default'}
              shape="round"
              onClick={() => setParam('cat', item, 'All')}
            >
              {item}
            </Button>
          ))}
        </Space>
        <Select
          aria-label="Sort"
          value={sort}
          options={sorts}
          style={{ width: 200 }}
          onChange={(value) => setParam('sort', value, 'featured')}
        />
      </Flex>

      {q && (
        <Typography.Text type="secondary">
          {list.length} result{list.length === 1 ? '' : 's'} for “{q}”
        </Typography.Text>
      )}

      {list.length === 0 ? (
        <Empty description="No matches. Try another word or clear the filters." />
      ) : (
        <Row gutter={[16, 16]}>
          {list.map((product) => (
            <Col key={product.id} xs={24} sm={12} lg={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  )
}
