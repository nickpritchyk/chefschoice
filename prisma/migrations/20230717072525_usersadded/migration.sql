/*
  Warnings:

  - You are about to alter the column `ingredients` on the `recipebook` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Json`.

*/
-- AlterTable
ALTER TABLE `recipebook` ADD COLUMN `imgurl` VARCHAR(100) NULL,
    ADD COLUMN `userid` INTEGER NULL,
    MODIFY `ingredients` JSON NOT NULL,
    MODIFY `instructions` MEDIUMTEXT NOT NULL;

-- CreateTable
CREATE TABLE `users` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `userid_idx` ON `recipebook`(`userid`);

-- AddForeignKey
ALTER TABLE `recipebook` ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
