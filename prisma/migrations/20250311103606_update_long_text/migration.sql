/*
  Warnings:

  - You are about to drop the `galleryimage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `galleryimage` DROP FOREIGN KEY `GalleryImage_galleryId_fkey`;

-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `images` JSON NOT NULL;

-- DropTable
DROP TABLE `galleryimage`;
