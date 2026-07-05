-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "content" TEXT,
ADD COLUMN     "embedUrl" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "coverImageUrl" TEXT,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
