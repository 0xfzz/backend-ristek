-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BarangToKategori` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BarangToKategori_AB_unique`(`A`, `B`),
    INDEX `_BarangToKategori_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BarangToKategori` ADD CONSTRAINT `_BarangToKategori_A_fkey` FOREIGN KEY (`A`) REFERENCES `Barang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BarangToKategori` ADD CONSTRAINT `_BarangToKategori_B_fkey` FOREIGN KEY (`B`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
