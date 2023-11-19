import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Brand from '@/models/brand'

export async function POST(req: Request) {
   try {
      const { name, slug } = await req.json()

      await dbConnect()

      const brand = await Brand.create({
         name: name,
         slug: slug,
      })

      return NextResponse.json(brand)
   } catch (error: unknown) {
      // @ts-ignore
      if (error.code == 11000) {
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function PATCH(req: Request) {
   const { _id, name } = await req.json()

   try {
      await dbConnect()
      const brand = await Brand.findOneAndUpdate({ _id }, { name })

      return NextResponse.json({ brand })
   } catch (error) {
      // @ts-ignore
      if (error.code == 11000) {
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const brand = await Brand.findOneAndDelete({ _id })

      return NextResponse.json(brand)
   } catch (error) {
      console.error('Error deleting brand:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
