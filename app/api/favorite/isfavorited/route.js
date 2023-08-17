import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()

    const recipe = await prisma.favorites.findMany({
        where: {
            AND: [
            { recipesid: parseInt(data.recipesid) },
            { usersid: parseInt(data.usersid) }
        ]
        }
    })

    if(recipe.length > 0) {
        return NextResponse.json({isFavorited: true})
    } else {
        return NextResponse.json({isFavorited: false})
    }
}