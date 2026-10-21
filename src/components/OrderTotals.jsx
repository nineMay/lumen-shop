import { Alert, Flex, Typography } from 'antd'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

/** 抽屉、购物袋、结账共用同一套金额，避免三处各算一遍。 */
export default function OrderTotals() {
  const { subtotal, shipping, total, FREE_SHIPPING_FROM } = useCart()
  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal)

  return (
    <Flex vertical gap={8}>
      <Alert
        type={remaining > 0 ? 'warning' : 'success'}
        showIcon
        message={
          remaining > 0
            ? `Add ${formatPrice(remaining)} for free worldwide shipping.`
            : 'Free worldwide shipping unlocked.'
        }
      />
      <Flex justify="space-between">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </Flex>
      <Flex justify="space-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </Flex>
      <Flex justify="space-between">
        <Typography.Text strong>Total (USD)</Typography.Text>
        <Typography.Text strong>{formatPrice(total)}</Typography.Text>
      </Flex>
    </Flex>
  )
}
