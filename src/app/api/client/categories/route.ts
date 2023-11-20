import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

import { NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    const factories = await Category.find()
    return NextResponse.json(factories)
}