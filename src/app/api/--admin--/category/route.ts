import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

export async function POST(req: Request) {
   try {
      const { name } = await req.json()
      await dbConnect()

      const factory = await Category.create({ name })

      return NextResponse.json(factory)
   } catch (error) {
      if ((error as { code: number }).code == 11000) {
         return NextResponse.json({ status: 11000 })
      } else {
         console.error('category/POST', error);
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function PATCH(req: Request) {
   const { _id, name } = await req.json()

   try {
      await dbConnect()
      const category = await Category.findOneAndUpdate({ _id }, { name })

      return NextResponse.json({
         category,
      })
   } catch (error) {
      if ((error as { code: number }).code == 11000) {
         return NextResponse.json({ status: 11000 })
      } else {
         console.error('category/PATCH', error);
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const category = await Category.findOneAndDelete({ _id })

      return NextResponse.json(category)
   } catch (error) {
      console.error('category/DELETE:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
