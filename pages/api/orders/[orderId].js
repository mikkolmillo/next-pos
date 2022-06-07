import { prisma } from "../../../lib/db"

export default async function userHandler(req, res) {
  const { method, query  } = req

  switch (method) {
    case 'GET':
      const allOrders = await getOrders(query.orderId)

      return res.status(200).json(allOrders)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getOrders = async (orderId) => {
  try {
    const allOrders = await prisma.orders.findFirst({
      where: {
        id: Number(orderId)
      }
    })

    return allOrders
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect()
}