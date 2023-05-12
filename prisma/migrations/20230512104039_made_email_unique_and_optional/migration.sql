/*
  Warnings:

  - A unique constraint covering the columns `[email_address]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "email_address" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_address_key" ON "Member"("email_address");
