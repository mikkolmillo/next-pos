import { prisma } from "../../../lib/db"

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()

export default async function userHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      const allUsers = await getUsers()

      return res.status(200).json(allUsers)

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getUsers = async () => {
  try {
    const allUsers = await prisma.users.findMany({})

    return allUsers
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect()
}