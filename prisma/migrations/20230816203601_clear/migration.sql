/*
  Warnings:

  - The primary key for the `recipebook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipebook` table. All the data in the column will be lost.
  - Added the required column `author` to the `recipebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeid` to the `recipebook` table without a default value. This is not possible if the table is not empty.
  - Made the column `userid` on table `recipebook` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `recipebook` DROP FOREIGN KEY `userid`;

-- AlterTable
ALTER TABLE `recipebook` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `author` VARCHAR(45) NOT NULL,
    ADD COLUMN `imgkey` VARCHAR(200) NULL,
    ADD COLUMN `recipeid` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `imgurl` VARCHAR(200) NULL,
    MODIFY `userid` INTEGER NOT NULL,
    ADD PRIMARY KEY (`recipeid`);

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(280) NOT NULL,
    `recipeid` INTEGER NOT NULL,
    `author` VARCHAR(45) NOT NULL,
    `authorid` INTEGER NOT NULL,

    INDEX `authorid_idx`(`authorid`),
    INDEX `comments_ibfk_1`(`recipeid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `favoriteid` INTEGER NOT NULL AUTO_INCREMENT,
    `recipesid` INTEGER NOT NULL,
    `usersid` INTEGER NOT NULL,

    INDEX `recipesid`(`recipesid`),
    INDEX `usersid_idx`(`usersid`),
    PRIMARY KEY (`favoriteid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recipebook` ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `authorid` FOREIGN KEY (`authorid`) REFERENCES `users`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipeid`) REFERENCES `recipebook`(`recipeid`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`recipesid`) REFERENCES `recipebook`(`recipeid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `usersid` FOREIGN KEY (`usersid`) REFERENCES `users`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
