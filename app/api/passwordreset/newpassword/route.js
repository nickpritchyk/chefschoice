import { NextResponse } from 'next/server'
import { hash } from 'bcrypt';


const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req) {
    const data = await req.json()
    const password = await hash(data.newPassword, 12)

    const user = await prisma.users.update({
        where: {
            username: data.username
        },
        data: {
            password: password
        }
    })

    return NextResponse.json({ message: '' }, { status: 200 })

}