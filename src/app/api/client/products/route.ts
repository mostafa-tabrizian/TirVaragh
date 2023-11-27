import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get('category')

    await dbConnect()

    if (category) {
        const products = await Product.find({
            category,
            active: true
        })
        return NextResponse.json(products)
    }

    const products = await Product.find({ active: true })
    return NextResponse.json(products)
}