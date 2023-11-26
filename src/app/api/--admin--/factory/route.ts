import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Factory from '@/models/factory'

export async function POST(req: Request) {
   try {
      const { name, logo, active } = await req.json()
      await dbConnect()

      const factory = await Factory.create({ name, logo, active })

      return NextResponse.json(factory)
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function PATCH(req: Request) {
   const { _id, name, active } = await req.json()

   try {
      await dbConnect()
      const factory = await Factory.findOneAndUpdate({ _id }, { name, active })
      return NextResponse.json({ factory })
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const factory = await Factory.findOneAndDelete({ _id })

      return NextResponse.json(factory)
   } catch (error) {
      console.error('Error deleting factory:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
