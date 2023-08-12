import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req) {
    const data = await req.json()
    const user = await prisma.recipebook.delete({
        where: {
            id: parseInt(data.id)
        },
    })
    return NextResponse.json({ message: 'Recipe Deleted' })
}