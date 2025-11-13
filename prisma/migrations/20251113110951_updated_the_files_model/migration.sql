/*
  Warnings:

  - Added the required column `format` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_type` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "resource_type" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
