import { Request, Response } from "express";
import { Database } from "../lib/db";

export class BarangController {
    database: Database;
    constructor(database: Database) {
        this.database = database
    }
    tambahBarang = async (req: Request, res: Response )=> {
        const {name, quantity, price, categories} = req.body
        const _categories = categories.map((el: number) => {
            return {
                id: el
            }
        })
        await this.database.client.barang.create({
            data: {
                name,
                quantity,
                price,
                kategori: {
                    connect: _categories
                }
            }
        })
        return res.json({
            message: "Success memasukkan barang baru"
        })
        
    }
    deleteBarang = async (req: Request, res: Response )=> {
        const { id } = req.body
        await this.database.client.barang.delete({
            where: {
                id
            }
        })
        return res.json({
            message: "Success menghapus barang"
        })
    }
    getAllBarang = async (req: Request, res: Response )=> {
        let options = {}
        if(req.query.kategori_id){
            options = {
                where: {
                    kategori: {
                        some: {
                            id: {
                                equals: parseInt(req.query.kategori_id as string)
                            }
                        }
                    }
                }
            }
        }
        const data = await this.database.client.barang.findMany({
            include: {
                kategori:true
            },

            ...options
        })

        return res.json({
            data
        })
    }
    updateBarang = async (req: Request, res: Response )=> {
        const { id, ...rest } = req.body
        const allowedKeys = [
            "name", "quantity", "price", "categories"
        ]
        const keys = Object.keys(rest)
        for(const key of keys){
            if(!allowedKeys.includes(key)){
                return res.status(400).json({
                    message: "Hayo"
                })
            }
        }
        const oldData = await this.database.client.barang.findFirst({
            include: {
                kategori:true
            },
            where: {
                id
            }
        })
        const oldKategoriIds = oldData?.kategori.map((el) => el.id)
        const kategoriShouldDisconnected: {id: number}[] = []
        const kategoriShouldConnected: {id: number}[] = []
        rest.categories.forEach((value: number, index: number) => {
            if(!oldKategoriIds?.includes(value)){
                kategoriShouldConnected.push({
                    id: value
                })
            }
        })
        oldKategoriIds?.forEach((value, index) => {
            if(!rest.categories.includes(value)){
                kategoriShouldDisconnected.push({
                    id: value
                })
            }
        })
        const { categories, ...data } = rest
        await this.database.client.barang.update({
            data: {
                ...data,
                kategori: {
                    disconnect: kategoriShouldDisconnected,
                    connect: kategoriShouldConnected
                }
            },
            where: {
                id
            }
        })
        return res.json({
            message: "Success menghapus barang"
        })
    }
}