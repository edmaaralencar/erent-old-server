/*
  Warnings:

  - Added the required column `status` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rentals" ADD COLUMN     "status" TEXT NOT NULL;
