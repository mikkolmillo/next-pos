import { prisma } from "../../../lib/db"

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()

export default async function userHandler(req, res) {
  const { method, query } = req

  console.log(req.query);
  switch (method) {
    case 'GET':
      const user = await getUsers(query.userId)

      return res.status(200).json(user)

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getUsers = async (userId) => {
  try {
    const allUsers = await prisma.users.findFirst({
      where: {
        id: userId
      },
      include: {
        orders: {
          include: { products: true }
        }
      }
    })

    return allUsers
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect()
}