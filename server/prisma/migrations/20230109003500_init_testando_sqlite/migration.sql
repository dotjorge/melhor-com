-- CreateTable
CREATE TABLE "phones" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);
