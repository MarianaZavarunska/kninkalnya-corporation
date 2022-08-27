-- CreateTable
CREATE TABLE "AddPromotions" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "descriptions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);
