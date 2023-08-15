import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()

    const user = await prisma.recipebook.update({
        where: {
            recipeid: parseInt(data.recipeID)
        },
        data: {
            name: data.title,
            description: data.description,
            ingredients: data.ingredientsJSON,
            cooktime: parseInt(data.cookTime),
            instructions: data.instructions,
            imgurl: data.imgURL,
            imgkey: data.imgkey,
        }
    })
    return NextResponse.json({ message: 'Recipe Updated' })
}