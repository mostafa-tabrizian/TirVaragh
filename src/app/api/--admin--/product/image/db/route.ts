import { NextResponse } from 'next/server'

import Product from '@/models/product'
import dbConnect from '@/lib/dbConnect'

interface BodyType {
   type: string
   key: string
   _id: string
}

export async function POST(req: Request) {
   const { type, key, _id }: BodyType = await req.json()

   await dbConnect()

   let res

   if (type == 'thumbnail') {
      res = await Product.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            thumbnail: key,
         },
      ).exec()
   } else if (type == 'images') {
      res = await Product.findOne({
         _id: _id,
      }).exec()

      res.images.push(key)
      res.save()
   }

   return NextResponse.json({ res })
}

export async function DELETE(req: Request) {
   const { type, key, _id }: BodyType = await req.json()

   await dbConnect()

   let res

   if (type == 'thumbnail') {
      res = await Product.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            thumbnail: '',
         },
      ).exec()
   } else if (type == 'images') {
      res = await Product.findOne({
         _id: _id,
      }).exec()

      const filteredItems = res.images.filter((item: string) => item !== key)

      res.images = filteredItems
      res.save()
   }

   return NextResponse.json({ res })
}
