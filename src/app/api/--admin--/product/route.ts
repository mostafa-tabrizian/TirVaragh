import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

export async function POST(request: Request) {
   const {
      active,
      title,
      category,
      price,
      length,
      width,
      thickness,
      inStock,
   }: {
      active: boolean
      title: string
      category: string
      price: number
      length: number
      width: number
      thickness: number
      inStock: boolean
   } = await request.json()

   try {
      await dbConnect()
      const product = await Product.create({
         active,
         title,
         category,
         price: [{
            value: price,
            submittedAt: new Date()
         }],
         length,
         width,
         thickness,
         inStock,
      })

      return NextResponse.json(product)
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function PATCH(request: Request) {
   const {
      _id,
      active,
      title,
      category,
      price,
      length,
      width,
      thickness,
      inStock,
   }: {
      _id: string,
      active: boolean
      title: string
      category: string
      price: number
      length: number
      width: number
      thickness: number
      inStock: boolean
   } = await request.json()

   try {
      await dbConnect()
      const product = await Product.findOne(
         { _id },
         {
            active,
            title,
            category,
            price,
            length,
            width,
            thickness,
            inStock
         },
      )

      product.price.push({
         value: price,
         submittedAt: new Date()
      })
      product.save()

      return NextResponse.json(product)
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}
