-- CreateTable
CREATE TABLE "Release" (
    "uuid" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "brandUuid" TEXT NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Release_slug_key" ON "Release"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Release_name_key" ON "Release"("name");

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_brandUuid_fkey" FOREIGN KEY ("brandUuid") REFERENCES "Brand"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
