/*
  Warnings:

  - A unique constraint covering the columns `[zoneId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zoneId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "zoneId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_id_key" ON "Attendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_id_key" ON "Zone"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_zoneId_key" ON "Member"("zoneId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
