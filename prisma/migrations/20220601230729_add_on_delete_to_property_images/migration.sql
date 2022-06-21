-- DropForeignKey
ALTER TABLE "properties_images" DROP CONSTRAINT "properties_images_property_id_fkey";

-- AddForeignKey
ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
