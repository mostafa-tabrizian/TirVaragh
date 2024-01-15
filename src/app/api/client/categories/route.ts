import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    req.nextUrl.searchParams.get('')

    await dbConnect()
    const categories = await Category.find().lean()

    return NextResponse.json(categories)
}