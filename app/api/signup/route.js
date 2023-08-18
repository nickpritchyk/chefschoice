import { NextResponse, NextRequest } from 'next/server'
import { fieldEncryptionMiddleware } from 'prisma-field-encryption'
import { hash } from 'bcrypt';

const { PrismaClient } = require('@prisma/client')

export const prisma = new PrismaClient()
prisma.$use(fieldEncryptionMiddleware())

export async function POST(req, res) {
    const data = await req.json()
    const password = await hash(data.password, 12)
    const notUnique = await prisma.users.findUnique({
        where: {
            username: data.username
        }
    })
    if(notUnique) {
        return new Response(JSON.stringify('Username already taken'), {
            status: 406
        })
    } else {
        await prisma.users.create({
            data: {
                username: data.username,
                password: password,
            }
        })
        return new Response(JSON.stringify('Account successfully created'))
    }
}