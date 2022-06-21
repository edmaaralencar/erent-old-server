-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_property_id_fkey";

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
