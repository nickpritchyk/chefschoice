import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function GET(req, res) {
    const data = await prisma.users.findMany()
    return NextResponse.json(data)
}