/*
  Warnings:

  - You are about to drop the `properties_options` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "properties_options" DROP CONSTRAINT "properties_options_property_id_fkey";

-- DropTable
DROP TABLE "properties_options";

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionsOnProperties" (
    "property_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,

    CONSTRAINT "OptionsOnProperties_pkey" PRIMARY KEY ("property_id","option_id")
);

-- AddForeignKey
ALTER TABLE "OptionsOnProperties" ADD CONSTRAINT "OptionsOnProperties_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionsOnProperties" ADD CONSTRAINT "OptionsOnProperties_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
