import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req) {
    const data = await req.json()

    const user = await prisma.users.findUnique({
        where: {
            username: data.username
        }
    })


    if((user.question == data.securityQuestion) && (user.answer == data.answer)) {
        return NextResponse.json({ message: 'User validated' }, { status: 200 })
    }

    return NextResponse.json({ message: 'user not validated!' }, { status: 401 })

}