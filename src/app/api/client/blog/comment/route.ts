import { NextResponse } from 'next/server'

import Blog, { IBlog } from '@/models/blog'
import dbConnect from '@/lib/dbConnect'
import RecaptchaVerify from '@/lib/recaptchaVerify'

export async function POST(req: Request) {
    const payload: {
        type: string
        blogId: string
        commentId: string | null
        userIP: string
        gReCaptchaToken: string
        username: string
        body: string
    } = await req.json()

    const {
        type,
        blogId,
        commentId,
        userIP,
        gReCaptchaToken,
        username,
        body
    } = payload

    const recaptchaRes = await RecaptchaVerify(gReCaptchaToken)
    if (!recaptchaRes) return NextResponse.json({ message: 'recaptcha fail' })

    if (!userIP.length) return NextResponse.json({ status: 403 })

    await dbConnect()

    const blog = await Blog.findOne({ _id: blogId }).exec()

    if (type == 'comment') {
        blog.comments.push({
            userIP,
            username,
            body,
            replys: [],
            createdAt: new Date(),
        })
    } else if (type == 'reply') {
        const comment = (blog.comments).find((comment: IBlog['comments'][0]) => comment._id == commentId)

        comment.replys.push({
            userIP,
            username,
            body,
            createdAt: new Date(),
        })
    }

    blog.save()

    return NextResponse.json({ message: 'comment submitted.' })
}