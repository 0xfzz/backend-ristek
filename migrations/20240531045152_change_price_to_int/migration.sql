/*
  Warnings:

  - You are about to alter the column `price` on the `Barang` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Barang` MODIFY `price` INTEGER NOT NULL;
