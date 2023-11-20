import mongoose from 'mongoose'

export interface ICategory {
   _id: string
   name: string
   createdAt: Date
   updatedAt: Date
}

const CategorySchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true,
   },
})

CategorySchema.set('timestamps', true)

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
