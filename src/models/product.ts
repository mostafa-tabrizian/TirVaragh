import mongoose from 'mongoose'

export interface IProduct {
   active: boolean
   _id: string
   title: string
   category: string
   factory: string
   price: [{
      value: number
      submittedAt: Date
   }]
   length: number
   width: number
   thickness: number
   inStock: boolean
   createdAt: Date
   updatedAt: Date
}

const ProductSchema = new mongoose.Schema({
   active: {
      type: Boolean,
      default: true,
   },
   title: String,
   category: String,
   factory: String,
   price: [],
   length: Number,
   width: Number,
   thickness: Number,
   inStock: {
      type: Boolean,
      default: true,
   },
})

ProductSchema.set('timestamps', true)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
