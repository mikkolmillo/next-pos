import { prisma } from "../../lib/db"

export default async function userHandler(req, res) {
  const { method, body } = req

  switch (method) {
    case "POST":
      const order = await addOrder(body.order)
      const success = await updateProductQty(body.order)

      if (order && success) {
        return res.status(201).json(order)
      } else {
        return res.status(500).json({ status: "fail", message: "Server Error" })
      }
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

const updateProductQty = async (newOrder) => {
  let success = false

  try {
    // Qty each item
    const qty = newOrder.items.map(item => {
      return { id: item.id, amount: item.amount }
    })

    let reduceQty

    for (let i = 0; i < qty.length; i++) {
      reduceQty = await prisma.product_t.update({
        where: {
          id: Number(qty[i].id)
        },
        data: {
          quantity: {
            decrement: Number(qty[i].amount)
          }
        }
      })

      success = true
      console.log(success);
    }

    return success
  } catch (error) {
    console.error(error);
    return success
  }
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