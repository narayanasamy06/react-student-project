/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_uid_key" ON "Student"("uid");
