-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(1000),
    "brand" VARCHAR(500),
    "user_id" VARCHAR(300),
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_t" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(400),
    "description" VARCHAR(2000),
    "price" VARCHAR(2000),
    "code" VARCHAR(50),
    "quantity" INTEGER DEFAULT 0,
    "images" VARCHAR(100),
    "model" VARCHAR(4000),
    "format_type" VARCHAR(10),
    "placement_type" VARCHAR(10),
    "main_category" VARCHAR(50),
    "sub_category" VARCHAR(50),
    "group_category" VARCHAR(50),
    "class_category" VARCHAR(50),

    CONSTRAINT "product_t_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_tId" INTEGER NOT NULL,
    "ordersId" INTEGER NOT NULL,

    CONSTRAINT "products_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "totalAmount" VARCHAR(100) NOT NULL,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "save_work" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(300),
    "file" VARCHAR(65535),
    "user_id" VARCHAR(300),
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "save_work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_product_tId_fkey" FOREIGN KEY ("product_tId") REFERENCES "product_t"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
