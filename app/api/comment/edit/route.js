import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req, res) {
    const data = await req.json()
    const comment = await prisma.comments.update({
        where: {
            id: parseInt(data.commentid)
        },
        data: {
            rating: parseInt(data.rating),
            comment: data.comment
        }
    })
    return NextResponse.json({ message: 'Comment edited'})
}