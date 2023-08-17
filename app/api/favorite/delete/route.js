import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()

    const user = await prisma.favorites.deleteMany({
        where: {
            AND: [
            { recipesid: parseInt(data.recipesid) },
            { usersid: parseInt(data.usersid) }
            ]
        }
    })
    return NextResponse.json({ message: 'Recipe removed from favorites' })
}