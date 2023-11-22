import { NextResponse } from 'next/server'

import Blog, { IBlog } from '@/models/blog'
import dbConnect from '@/lib/dbConnect'

export async function POST(req: Request) {
   const { blogId, userIP } = (await req.json()) as {
      blogId: string
      userIP: string
   }

   await dbConnect()
   const blog: IBlog | null = await Blog.findOne({ _id: blogId }).exec()

   if (!blog) return NextResponse.json({ status: 404 })

   if (blog.likes.includes(userIP)) {
      const index = blog.likes.indexOf(userIP)
      blog.likes.splice(index, 1)
      //   @ts-ignore
      blog.save()
   } else {
      blog.likes.push(userIP)
      //   @ts-ignore
      blog.save()
   }

   return NextResponse.json({ message: 'like submitted.' })
}
