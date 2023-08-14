import { NextResponse } from 'next/server'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function GET(req, res) {
    const comment = await prisma.comments.findMany()
    return NextResponse.json(data)
}

export async function POST(req, res) {
    const data = await req.json()
    const user = await prisma.comments.create({
        data: {
            rating: parseInt(data.rating),
            comment: data.comment,
            recipeid: parseInt(data.recipeid),
            author: data.author,
            authorid: parseInt(data.authorid),
        }
    })
    return NextResponse.json( {message: 'Comment posted'} )
}