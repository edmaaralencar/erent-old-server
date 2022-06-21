-- DropForeignKey
ALTER TABLE "properties_options" DROP CONSTRAINT "properties_options_property_id_fkey";

-- AddForeignKey
ALTER TABLE "properties_options" ADD CONSTRAINT "properties_options_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
