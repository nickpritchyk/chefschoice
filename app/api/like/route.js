import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    const like = await prisma.recipebook.update({
        where: {
            id: data.recipeID
        },
        data: {
            likes: {
                increment: 1,
            }
        }
    })
    return NextResponse.json({ message: 'Recipe Liked' })
}