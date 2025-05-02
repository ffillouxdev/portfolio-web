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
    "whichCase" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT 'inconnue'
);
INSERT INTO "new_Project" ("date", "desc", "id", "link", "screens", "skills", "title", "whichCase") SELECT coalesce("date", 'inconnue') AS "date", "desc", "id", "link", "screens", "skills", "title", "whichCase" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
