import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'
import Factory from '@/models/factory'

export async function POST(request: Request) {
   const {
      active,
      title,
      category,
      factory,
      price,
      length,
      width,
      thickness,
      inStock,
   }: {
      active: boolean
      title: string
      category: string
      factory: string
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
         factory,
         price: [{
            value: price,
            submittedAt: new Date()
         }],
         length,
         width,
         thickness,
         inStock,
      })

      await Factory.findOneAndUpdate(
         { _id: factory },
         { updatedAt: new Date() }
      )

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
      factory,
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
      factory: string
      price: number
      length: number
      width: number
      thickness: number
      inStock: boolean
   } = await request.json()

   try {
      await dbConnect()
      const product = await Product.findOneAndUpdate(
         { _id },
         {
            active,
            title,
            category,
            factory,
            length,
            width,
            thickness,
            inStock
         },
      )

      const currentPrice = product.price[product.price.length - 1]

      if (currentPrice !== price) {
         product.price.push({
            value: price,
            submittedAt: new Date()

         })

         product.save()
      }

      await Factory.findOneAndUpdate(
         { _id: factory },
         { updatedAt: new Date() }
      )


      return NextResponse.json(product)
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}
