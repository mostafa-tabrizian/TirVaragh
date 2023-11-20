import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Factory from '@/models/factory'

// export async function POST(req: Request) {
//    const { type, key, _id }: BodyType = await req.json()

//    await dbConnect()

//    let res

//    if (type == 'thumbnail') {
//       res = await Product.findOneAndUpdate(
//          {
//             _id: _id,
//          },
//          {
//             thumbnail: key,
//          },
//       ).exec()
//    } else if (type == 'images') {
//       res = await Product.findOne({
//          _id: _id,
//       }).exec()

//       res.images.push(key)
//       res.save()
//    }

//    return NextResponse.json({ res })
// }

export async function DELETE(req: Request) {
   const { _id } = await req.json()

   await dbConnect()

   const res = await Factory.findOneAndUpdate(
      { _id },
      { logo: '' },
   ).exec()

   return NextResponse.json({ res })
}
