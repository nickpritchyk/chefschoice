-- CreateTable
CREATE TABLE `recipebook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `ingredients` VARCHAR(45) NOT NULL,
    `cooktime` VARCHAR(45) NOT NULL,
    `instructions` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
