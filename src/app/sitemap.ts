import Product from '@/models/product'
import Category from '@/models/category'
import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

const URL = 'https://tirvaragh.com'

async function getAllPages() {
   await dbConnect()
   const productsData = await Product.find()
   const categoriesData = await Category.find()

   return { productsData, categoriesData }
}

export default async function sitemap() {
   const { productsData, categoriesData } = await getAllPages()

   const products = productsData.map(({ slug, updatedAt }) => ({
      url: `${URL}/product/${hyphen(slug)}`,
      lastModified: updatedAt,
   }))

   const categories = categoriesData.map(({ name, slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=category&amp;name=${name}`,
      lastModified: updatedAt,
   }))

   const routes = [''].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...products, ...categories]
}
