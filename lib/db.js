import { PrismaClient } from '@prisma/client'

export var prisma = new PrismaClient({
  log: ['query'],
})

if (process.env.NODE_ENV !== 'production') prisma = prisma