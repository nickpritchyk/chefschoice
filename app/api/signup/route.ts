import { NextResponse, NextRequest } from 'next/server'
import { fieldEncryptionMiddleware } from 'prisma-field-encryption'

const { PrismaClient } = require('@prisma/client')

export const prisma = new PrismaClient()
prisma.$use(fieldEncryptionMiddleware())

export async function POST(req: Request, res: Response) {
    const data = await req.json()
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
                password: data.password,
            }
        })
        return new Response(JSON.stringify('Account successfully created'))
    }
}