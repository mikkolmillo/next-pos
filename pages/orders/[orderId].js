import { useRouter } from 'next/router';

const OrderPage = ({order}) => {
  const router = useRouter()

  router.query
  return (
    <div>{order.id}</div>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const orderId = params.orderId

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/orders/${orderId}`)
    const loadedOrder = await res.json()

    console.log(loadedOrder);
    return {
      props: {
        order: loadedOrder
      }
    }
  } catch (error) {

  }

  return {
    props: {
      order: {}
    }
  }
}

export default OrderPage