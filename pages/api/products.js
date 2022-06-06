import { prisma } from "../../lib/db"

export default async function userHandler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      const products = await getProducts()

      return res.status(200).json(products)

    case "POST":
      const newProduct = await addProduct(body.product)

      return res.status(201).json(newProduct)

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
    console.error(error);
  }

  await prisma.$disconnect()
}

const addProduct = async (newProduct) => {
  try {
    const product = await prisma.product_t.create({
      data: newProduct
    })

    return product
  } catch (error) {
    console.error(error);
  }
}