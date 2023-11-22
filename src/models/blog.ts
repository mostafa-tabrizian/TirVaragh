import mongoose from 'mongoose'

export interface IBlog {
    _id: string
    active: boolean
    title: string
    slug: string
    thumbnail: string
    readTime: number
    likes: [string]
    comments: [
        {
            _id: string
            userIP: string
            username: string
            body: string
            replys: [
                {
                    _id: string
                    userIP: string
                    username: string
                    body: string
                    approval: string,
                    createdAt: Date
                }
            ]
            approval: string,
            createdAt: Date
        }
    ]
    authorId: string
    text: string
    createdAt: Date
    updatedAt: Date
    modifiedAt: Date
}

const blogSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    title: String,
    slug: String,
    thumbnail: String,
    readTime: Number,
    likes: [String],
    comments: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            userIP: String,
            username: String,
            body: String,
            approval: {
                type: String,
                default: 'pending'
            },
            replys: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        index: true,
                        required: true,
                        auto: true
                    },
                    userIP: String,
                    username: String,
                    body: String,
                    approval: {
                        type: String,
                        default: 'pending'
                    },
                    createdAt: Date
                }
            ],
            createdAt: Date
        },
    ],
    authorId: String,
    text: String,
    modifiedAt: Date
})

blogSchema.set('timestamps', true)

blogSchema.index({ slug: 'text' }, { unique: true })

export default mongoose.models.blog || mongoose.model('blog', blogSchema)