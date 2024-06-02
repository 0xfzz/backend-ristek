import { Request, Response } from "express";
import { Database } from "../lib/db";

export class KategoriController {
    database: Database;
    constructor(database: Database) {
        this.database = database
    }
    tambahKategori = async (req: Request, res: Response )=> {
        const {name} = req.body
        await this.database.client.kategori.create({
            data: {
                name
            }
        })
        return res.json({
            message: "Success memasukkan kategori baru"
        })
        
    }
    deleteKategori = async (req: Request, res: Response )=> {
        const { id } = req.body
        await this.database.client.kategori.delete({
            where: {
                id
            }
        })
        return res.json({
            message: "Success menghapus kategori"
        })
    }
    getAllKategori = async (req: Request, res: Response )=> {

        const data = await this.database.client.kategori.findMany()

        return res.json({
            data
        })
    }
    updateKategori = async (req: Request, res: Response )=> {
        const { id, name } = req.body
        await this.database.client.kategori.update({
            data: {
                name
            },
            where: {
                id
            }
        })
        return res.json({
            message: "Success mengupdate kategori"
        })
    }
}