/*
  Warnings:

  - Changed the type of `closing_day` on the `creditcard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `due_data` on the `creditcard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "creditcard" DROP COLUMN "closing_day",
ADD COLUMN     "closing_day" TIMESTAMP(3) NOT NULL,
DROP COLUMN "due_data",
ADD COLUMN     "due_data" TIMESTAMP(3) NOT NULL;
