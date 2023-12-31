import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    console.log(data)
    const user = await prisma.recipebook.create({
        data: {
            name: data.title,
            description: data.description,
            ingredients: data.ingredientsJSON,
            cooktime: parseInt(data.cookTime),
            instructions: data.instructions,
            imgurl: data.imgURL,
            imgkey: data.imgkey,
            author: data.author,
            userid: data.userid,
        }
    })
    return NextResponse.json({ message: 'Recipe Added' })
}

export async function GET() {
    const data = await prisma.recipebook.findMany({
        include: {
            users: true
        }
    })
    return NextResponse.json(data)
}