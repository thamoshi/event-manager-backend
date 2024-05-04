-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "ein" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "localTypeId" INTEGER NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LocalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalInformation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "complement" TEXT,
    "localId" INTEGER NOT NULL,

    CONSTRAINT "LocalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localId" INTEGER NOT NULL,
    "isTicketGate" BOOLEAN NOT NULL,

    CONSTRAINT "Gate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Local_name_key" ON "Local"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Local_ein_key" ON "Local"("ein");

-- CreateIndex
CREATE UNIQUE INDEX "LocalType_name_key" ON "LocalType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocalInformation_localId_key" ON "LocalInformation"("localId");

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_localTypeId_fkey" FOREIGN KEY ("localTypeId") REFERENCES "LocalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalInformation" ADD CONSTRAINT "LocalInformation_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gate" ADD CONSTRAINT "Gate_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;
