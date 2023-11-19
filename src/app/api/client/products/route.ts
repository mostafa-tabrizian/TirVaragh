import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import { NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    const products = await Product.find()
    return NextResponse.json(products)
 }