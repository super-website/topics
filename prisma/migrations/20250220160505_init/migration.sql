/*
  Warnings:

  - Added the required column `short_desc` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subject` ADD COLUMN `short_desc` VARCHAR(191) NOT NULL;
