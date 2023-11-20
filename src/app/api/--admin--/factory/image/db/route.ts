import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Factory from '@/models/factory'

export async function POST(req: Request) {
   const { _id, logo } = await req.json()

   await dbConnect()

   const res = await Factory.findOneAndUpdate(
      { _id },
      { logo }
   ).exec()

   return NextResponse.json({ res })
}

export async function DELETE(req: Request) {
   const { _id } = await req.json()

   await dbConnect()

   const res = await Factory.findOneAndUpdate(
      { _id },
      { logo: '' },
   ).exec()

   return NextResponse.json({ res })
}
