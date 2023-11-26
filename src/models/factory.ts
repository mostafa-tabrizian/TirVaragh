import mongoose from 'mongoose'

export interface IFactory {
   _id: string
   name: string
   logo: string
   active: boolean
   createdAt: Date
   updatedAt: Date
}

const FactorySchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true,
   },
   logo: String,
   active: {
      type: Boolean,
      default: false
   }
})

FactorySchema.set('timestamps', true)

export default mongoose.models.Factory || mongoose.model('Factory', FactorySchema)
