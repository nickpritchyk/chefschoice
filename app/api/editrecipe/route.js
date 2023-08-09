import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    const user = await prisma.recipebook.update({
        where: {
            name: data.title,
            userid: data.userid
        },
        data: {
            name: data.title,
            description: data.description,
            ingredients: data.ingredientsJSON,
            cooktime: parseInt(data.cookTime),
            instructions: data.instructions,
            imgurl: data.imgURL,
            userid: data.userid,
        }
    })
    return NextResponse.json({ message: 'Recipe Updated' })
}

export async function GET() {
    const data = await prisma.recipebook.findMany({
        include: {
            users: true
        }
    })
    return NextResponse.json(data)
}