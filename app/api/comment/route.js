import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function GET(req, res) {
    const comment = await prisma.comments.findMany()
    return NextResponse.json(data)
}

export async function POST(req, res) {
    const data = await req.json()
    console.log(data)
    return NextResponse.json(data)
}