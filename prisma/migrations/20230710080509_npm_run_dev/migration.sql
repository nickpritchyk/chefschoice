/*
  Warnings:

  - You are about to alter the column `cooktime` on the `recipebook` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.

*/
-- AlterTable
ALTER TABLE `recipebook` MODIFY `cooktime` INTEGER NOT NULL;
