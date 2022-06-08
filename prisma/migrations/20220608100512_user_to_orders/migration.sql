-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "usersId" UUID;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
