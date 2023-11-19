import mongoose from 'mongoose'

export interface IBrand {
   _id: string
   slug: string
   name: string
   createdAt: Date
   updatedAt: Date
}

const BrandSchema = new mongoose.Schema({
   slug: {
      type: String,
      unique: true,
   },
   name: {
      type: String,
      unique: true,
   },
})

BrandSchema.set('timestamps', true)

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema)
