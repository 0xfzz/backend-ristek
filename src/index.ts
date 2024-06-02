import express from 'express'
import { BarangController } from "./controller/barang.controller";
import { PrismaClient } from "@prisma/client";
import bodyParser from 'body-parser';
import cors from 'cors'
import { KategoriController } from './controller/kategori.controller';
const prisma = new PrismaClient()
const database = {
    client: prisma
}
const barang = new BarangController(database)
const kategori = new KategoriController(database)
const app = express()
app.use(bodyParser.json())
app.use(cors())
const PORT = 1337


app.post("/barang", barang.tambahBarang)
app.put("/barang", barang.updateBarang)
app.delete("/barang", barang.deleteBarang)
app.get("/barang", barang.getAllBarang)

app.post("/kategori", kategori.tambahKategori)
app.put("/kategori", kategori.updateKategori)
app.delete("/kategori", kategori.deleteKategori)
app.get("/kategori", kategori.getAllKategori)

app.listen(PORT, () => {
    console.log(`Web Listening at ${PORT}`)
})