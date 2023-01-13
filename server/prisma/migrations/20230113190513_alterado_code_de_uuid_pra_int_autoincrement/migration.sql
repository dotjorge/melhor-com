/*
  Warnings:

  - The primary key for the `phones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `code` on the `phones` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phones" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);
INSERT INTO "new_phones" ("brand", "code", "color", "endDate", "model", "price", "startDate") SELECT "brand", "code", "color", "endDate", "model", "price", "startDate" FROM "phones";
DROP TABLE "phones";
ALTER TABLE "new_phones" RENAME TO "phones";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
