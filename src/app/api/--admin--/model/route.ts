import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Model from '@/models/model'

export async function POST(req: Request) {
   try {
      const { name, slug } = await req.json()

      await dbConnect()

      const model = await Model.create({
         name,
         slug,
      })

      return NextResponse.json(model)
   } catch (error) {
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
      const model = await Model.findOneAndUpdate({ _id }, { name })

      return NextResponse.json({
         model,
      })
   } catch (error) {
      // @ts-ignore
      if (error.code == 11000) {
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function PUT(req: Request) {
   const { modelId, category } = await req.json()

   try {
      await dbConnect()
      const modelUpdated = await Model.findOneAndUpdate(
         {
            _id: modelId,
         },
         {
            category,
         },
      )

      return NextResponse.json({
         modelUpdated,
      })
   } catch (err) {
      return NextResponse.json({
         statue: 500,
         message: err,
      })
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const model = await Model.findOneAndDelete({ _id })

      return NextResponse.json(model)
   } catch (error) {
      console.error('Error deleting model:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
