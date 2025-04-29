-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "skills" JSONB NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT,
    "jobTitle" TEXT NOT NULL
);
