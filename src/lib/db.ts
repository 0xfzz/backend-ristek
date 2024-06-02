import { PrismaClient } from "@prisma/client";

export interface Database {
    client: PrismaClient
}
const prisma = new PrismaClient()
export const database: Database = {
    client: prisma
}