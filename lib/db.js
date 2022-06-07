import { PrismaClient } from '@prisma/client'

export var prisma = new PrismaClient({ log: ['query', 'info'] })

if (process.env.NODE_ENV !== 'production') prisma = prisma