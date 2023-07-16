import { NextResponse } from 'next/server'
import { fieldEncryptionMiddleware } from 'prisma-field-encryption'

const { PrismaClient } = require('@prisma/client')

export const prisma = new PrismaClient()
prisma.$use(fieldEncryptionMiddleware())

export async function POST(req, res) {
    const data = await req.json()
    await prisma.users.create({
        data: {
            username: data.username,
            password: data.password
        }
    })
    return NextResponse.json({ message: 'Sign up complete' })
}