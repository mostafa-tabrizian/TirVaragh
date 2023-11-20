import dbConnect from '@/lib/dbConnect'
import Factory from '@/models/factory'

import { NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    const factories = await Factory.find()
    return NextResponse.json(factories)
}