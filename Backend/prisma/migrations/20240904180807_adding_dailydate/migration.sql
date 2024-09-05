/*
  Warnings:

  - A unique constraint covering the columns `[dailyTaskId,date]` on the table `Completion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dailytask" ALTER COLUMN "repeatDaily" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Completion_dailyTaskId_date_key" ON "Completion"("dailyTaskId", "date");
