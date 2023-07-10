import { request } from 'http'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


export async function POST(req, res) {
    const data = await req.json()
    const user = await prisma.recipebook.create({
        data: {
            name: data.title,
            description: 'stuff',
            ingredients: data.ingredients,
            cooktime: 3,
            instructions: data.instructions,
        }
    })


    return new Response('OK')
}