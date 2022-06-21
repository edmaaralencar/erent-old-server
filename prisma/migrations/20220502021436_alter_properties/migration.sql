/*
  Warnings:

  - You are about to drop the column `location` on the `properties` table. All the data in the column will be lost.
  - Added the required column `city` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
