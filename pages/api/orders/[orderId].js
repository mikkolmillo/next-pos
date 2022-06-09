import { prisma } from "../../../lib/db"

export default async function userHandler(req, res) {
  const { method, query  } = req

  switch (method) {
    case 'GET':
      const order = await getOrders(query.orderId)

      return res.status(200).json(order)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getOrders = async (orderId) => {
  try {
    const order = await prisma.orders.findFirst({
      where: {
        id: Number(orderId)
      },
      include: {
        products: {
          include: {
            product_t: true
          }
        }
      },
    })

    return order
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect()
}