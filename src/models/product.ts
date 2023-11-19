import mongoose from 'mongoose'

export interface IProduct {
   active: boolean
   _id: string
   barcode: string
   name: string
   slug: string
   category: string
   model: string
   brand: string
   price: number
   discount: number
   thumbnail: string
   images: [string]
   detail: object
   description: string
   inStock: boolean
   createdAt: Date
   updatedAt: Date
}

const ProductSchema = new mongoose.Schema({
   active: {
      type: Boolean,
      default: true,
   },
   barcode: {
      type: String,
      unique: true,
      required: true,
   },
   name: String,
   slug: {
      type: String,
      unique: true,
      required: true,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   },
   model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
   },
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
   },
   price: Number,
   discount: Number,
   thumbnail: String,
   images: [String],
   detail: Object,
   description: String,
   inStock: {
      type: Boolean,
      default: true,
   },
})

ProductSchema.set('timestamps', true)

ProductSchema.index({ name: 'text', slug: 'text', description: 'text' })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
