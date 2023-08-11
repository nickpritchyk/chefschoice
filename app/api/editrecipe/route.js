import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    console.log(data.name)
    const user = await prisma.recipebook.update({
        where: {
            id: parseInt(data.recipeID)
        },
        data: {
            name: data.title,
            description: data.description,
            ingredients: data.ingredientsJSON,
            cooktime: parseInt(data.cookTime),
            instructions: data.instructions,
            imgurl: data.imgURL,
        }
    })
    return NextResponse.json({ message: 'Recipe Updated' })
}