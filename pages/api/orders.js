import { prisma } from "../../lib/db"

export default async function userHandler(req, res) {
  const { method, body } = req

  switch (method) {
    case "POST":
      const order = await addOrder(body)
      
      return res.status(201).json(order)

    case 'GET':
      break;

    default:
      res.setHeader('Allow', ['POST'])
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

const addOrder = async (data) => {
  try {
    
  } catch (error) {
    console.error(error);
  }
}