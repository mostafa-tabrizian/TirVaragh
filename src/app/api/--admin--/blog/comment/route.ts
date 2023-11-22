import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Blog, { IBlog } from '@/models/blog'

export async function PATCH(request: Request) {
    const {
        commentId,
        replyId,
        type,
        approval
    }: {
        commentId: string,
        replyId: string | null,
        type: string,
        approval: string
    } = await request.json()

    try {
        await dbConnect()

        const findComment = (blog: IBlog) => (blog.comments).find((comment: { _id: string }) => comment._id == commentId)

        const blog = await Blog.findOne(
            type == 'comment'
                ?
                { 'comments._id': commentId }
                : { 'comments.replys._id': replyId })
            .exec()

        const comment = findComment(blog) as IBlog['comments'][0]

        if (type == 'comment') {
            comment.approval = approval
        } else if (type == 'reply') {
            const reply = (comment.replys).find((reply: { _id: string }) => reply._id == replyId) as IBlog['comments'][0]['replys'][0]
            reply.approval = approval
        }

        blog.save()

        return NextResponse.json(blog)
    } catch (error) {
        return NextResponse.json({ status: 500, message: error })
    }
}