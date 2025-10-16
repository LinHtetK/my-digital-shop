-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "sellerEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_sellerEmail_fkey" FOREIGN KEY ("sellerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
