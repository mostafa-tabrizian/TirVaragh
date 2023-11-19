import mongoose from 'mongoose'

export interface IModel {
   _id: string
   slug: string
   name: string
   category: string
   createdAt: Date
   updatedAt: Date
}

const ModelSchema = new mongoose.Schema({
   slug: String,
   name: String,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   },
})

ModelSchema.set('timestamps', true)

export default mongoose.models.Model || mongoose.model('Model', ModelSchema)
