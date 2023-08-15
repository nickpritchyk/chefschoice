import { utapi } from "uploadthing/server";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const data = await req.json()
    const result = await utapi.deleteFiles(data.fileKey);
    return NextResponse.json(result)
}