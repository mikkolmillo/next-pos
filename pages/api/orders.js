// import { prisma } from "../../lib/db"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function userHandler(req, res) {
  const { method, body } = req

  switch (method) {
    case "POST":
      const order = await addOrder(body.order)

      return res.status(201).json(order)
    case 'GET':
      const allOrders = await getOrders()

      break;

    default:
      res.setHeader('Allow', ['POST'], ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getOrders = async () => {
  try {

  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect()
}

const addOrder = async (newOrder) => {
  try {
    const order = await prisma.orders.create({
      data: {
        totalAmount: newOrder.totalAmount.toLocaleString('en-AU'),
        products: {
          create: newOrder.items.map(product => {
            return {
              product_t: {
                connect: {
                  id: Number(product.id)
                }
              }
            }
          })
        }
      }
    })

    return order
  } catch (error) {
    console.error(error);
  }
}