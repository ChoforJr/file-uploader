-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "original_name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "upload_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "foldersId" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folders" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_foldersId_fkey" FOREIGN KEY ("foldersId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
