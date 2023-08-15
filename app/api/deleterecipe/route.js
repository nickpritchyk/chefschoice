import { NextResponse } from 'next/server'
import { utapi } from "uploadthing/server";

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req) {
    const data = await req.json()

    const result = await utapi.deleteFiles(data.imgkey);

    const user = await prisma.recipebook.delete({
        where: {
            recipeid: parseInt(data.recipeid)
        },
    })
    return NextResponse.json({ message: 'Recipe Deleted' })
}