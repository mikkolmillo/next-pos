import { prisma } from "../../../lib/db"

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()

export default async function userHandler(req, res) {
  const { method, body } = req

  switch (method) {
    case "POST":
      const user = await createGuestUser(body.user)
      const order = await addOrder(body.order, user.id)
      const success = await updateProductQty(body.order)

      if (user && order && success) {
        return res.status(201).json(order)
      } else {
        return res.status(500).json({ status: "fail", message: "Server Error" })
      }


    case 'GET':
      const allOrders = await getOrders()

      return res.status(200).json(allOrders)

    default:
      res.setHeader('Allow', ['POST'], ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const createGuestUser = async (userId) => {
  try {
    const user = await prisma.users.create({
      data: {
        id: userId,
        type: 'GUEST'
      }
    })

    return user
  } catch (error) {
    console.error(error);
  }
}

const getOrders = async () => {
  try {
    const allOrders = await prisma.orders.findMany({})

    return allOrders
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
    }

    return success
  } catch (error) {
    console.error(error);
    return success
  }
}

const addOrder = async (newOrder, user) => {
  try {
    const order = await prisma.orders.create({
      data: {
        totalAmount: newOrder.totalAmount.toLocaleString('en-AU'),
        users: {
          connect: {
            id: user
          }
        },
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