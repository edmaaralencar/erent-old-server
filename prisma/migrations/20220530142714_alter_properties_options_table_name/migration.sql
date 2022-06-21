/*
  Warnings:

  - You are about to drop the `OptionsOnProperties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OptionsOnProperties" DROP CONSTRAINT "OptionsOnProperties_option_id_fkey";

-- DropForeignKey
ALTER TABLE "OptionsOnProperties" DROP CONSTRAINT "OptionsOnProperties_property_id_fkey";

-- DropTable
DROP TABLE "OptionsOnProperties";

-- CreateTable
CREATE TABLE "properties_options" (
    "property_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,

    CONSTRAINT "properties_options_pkey" PRIMARY KEY ("property_id","option_id")
);

-- AddForeignKey
ALTER TABLE "properties_options" ADD CONSTRAINT "properties_options_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_options" ADD CONSTRAINT "properties_options_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
