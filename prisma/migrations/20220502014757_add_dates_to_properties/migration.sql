/*
  Warnings:

  - Added the required column `updated_at` to the `properties_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `properties_options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties_images" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "properties_options" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
