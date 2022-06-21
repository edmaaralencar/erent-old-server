/*
  Warnings:

  - You are about to drop the column `option` on the `options` table. All the data in the column will be lost.
  - Added the required column `name` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "options" DROP COLUMN "option",
ADD COLUMN     "name" TEXT NOT NULL;
