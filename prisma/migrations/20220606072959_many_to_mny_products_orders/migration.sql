-- CreateTable
CREATE TABLE "product_t" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(400),
    "description" VARCHAR(2000),
    "price" VARCHAR(2000),
    "code" VARCHAR(50),
    "quantity" VARCHAR(10),
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
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_orders" (
    "id" SERIAL NOT NULL,
    "product_tId" INTEGER NOT NULL,
    "ordersId" INTEGER NOT NULL,

    CONSTRAINT "products_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_product_tId_fkey" FOREIGN KEY ("product_tId") REFERENCES "product_t"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
