-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "screens" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "whichCase" TEXT NOT NULL
);
