import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/blog'

const URL = 'https://tirvaragh.com'

async function getAllPages() {
   await dbConnect()
   const blogData = await Blog.find()

   return { blogData }
}

export default async function sitemap() {
   const { blogData } = await getAllPages()

   const blogs = blogData.map(({ slug, modifiedAt }) => ({
      url: `${URL}/blog/${slug}`,
      lastModified: modifiedAt,
   }))


   const routes = [''].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...blogs]
}
