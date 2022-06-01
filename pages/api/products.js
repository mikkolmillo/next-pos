import { prisma } from "../../lib/db"

export default async function userHandler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const products = await getProducts()

      return res.status(200).json(products)
      break;

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getProducts = async () => {
  try {
    const allProducts = await prisma.product_t.findMany();

    return allProducts
  } catch (error) {
    console.log(error);
  }

  await prisma.$disconnect()
}