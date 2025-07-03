/*
  Warnings:

  - Added the required column `value` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "revenue" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "is_repeat" BOOLEAN,
    "paid" BOOLEAN,
    "realease_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3),
    "wallet_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "is_repeat" BOOLEAN,
    "paid" BOOLEAN,
    "realease_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "recurrence_id" TEXT NOT NULL,
    "creditCard_id" TEXT NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icons" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurrence" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER,
    "Periodicity" TEXT,

    CONSTRAINT "recurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditcard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "closing_day" INTEGER NOT NULL,
    "due_data" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "wallet_id" TEXT NOT NULL,

    CONSTRAINT "creditcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "release_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvestmentToWallet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InvestmentToWallet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InvestmentToWallet_B_index" ON "_InvestmentToWallet"("B");

-- AddForeignKey
ALTER TABLE "revenue" ADD CONSTRAINT "revenue_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue" ADD CONSTRAINT "revenue_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_recurrence_id_fkey" FOREIGN KEY ("recurrence_id") REFERENCES "recurrence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditcard" ADD CONSTRAINT "creditcard_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestmentToWallet" ADD CONSTRAINT "_InvestmentToWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestmentToWallet" ADD CONSTRAINT "_InvestmentToWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
