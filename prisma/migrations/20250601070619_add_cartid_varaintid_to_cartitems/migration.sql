/*
  Warnings:

  - A unique constraint covering the columns `[tempCartId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId,variantId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_tempCartId_key` ON `Cart`(`tempCartId`);

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_variantId_key` ON `CartItem`(`cartId`, `variantId`);
