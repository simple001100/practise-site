/*
  Warnings:

  - Added the required column `count` to the `PracticeApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PracticeApplication" ADD COLUMN     "count" INTEGER NOT NULL;
