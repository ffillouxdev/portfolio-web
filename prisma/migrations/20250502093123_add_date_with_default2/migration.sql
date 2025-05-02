/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "screens" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "date" TEXT NOT NULL DEFAULT 'aucune',
    "whichCase" TEXT NOT NULL
);
INSERT INTO "new_Project" ("desc", "id", "link", "screens", "skills", "title", "whichCase") SELECT "desc", "id", "link", "screens", "skills", "title", "whichCase" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
