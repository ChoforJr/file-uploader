/*
  Warnings:

  - You are about to drop the column `format` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `resource_type` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Files` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" DROP COLUMN "format",
DROP COLUMN "public_id",
DROP COLUMN "resource_type",
DROP COLUMN "type",
ADD COLUMN     "mimetype" TEXT NOT NULL;
