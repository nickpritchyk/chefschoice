import { request } from 'http'
import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    const user = await prisma.recipebook.create({
        data: {
            name: data.title,
            description: data.description,
            ingredients: data.ingredientsJSON,
            cooktime: parseInt(data.cookTime),
            instructions: data.instructions,
            imgurl: data.imgURL,
        }
    })

    return NextResponse.json({ message: 'Recipe Added' })
}

export async function GET(req, res) {
    const data = await prisma.recipebook.findMany()
    return NextResponse.json(data)
}