-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "listingUrl" TEXT,
    "municipality" TEXT NOT NULL,
    "askingPriceCad" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" REAL NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "interiorSqft" INTEGER NOT NULL,
    "lotSqft" INTEGER NOT NULL,
    "distanceToSkiKm" REAL NOT NULL,
    "distanceToVillageKm" REAL NOT NULL,
    "bikeAccessScore" INTEGER NOT NULL,
    "conditionScore" INTEGER NOT NULL,
    "rentalRevenuePotential" INTEGER NOT NULL,
    "listingText" TEXT NOT NULL,
    "notes" TEXT,
    "totalScore" INTEGER NOT NULL,
    "scoreBreakdown" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Property_totalScore_idx" ON "Property"("totalScore");

-- CreateIndex
CREATE INDEX "Property_askingPriceCad_idx" ON "Property"("askingPriceCad");

-- CreateIndex
CREATE INDEX "Property_municipality_idx" ON "Property"("municipality");
