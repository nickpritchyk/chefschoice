import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    const comment = await prisma.recipebook.update()
    return NextResponse.json({ message: 'Comment added' })
}