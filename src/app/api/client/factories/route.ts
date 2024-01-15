import dbConnect from '@/lib/dbConnect'
import Factory from '@/models/factory'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {

    req.nextUrl.searchParams.get('')

    await dbConnect()
    const factories = await Factory.find({ active: true }).lean()

    return NextResponse.json(factories)
}