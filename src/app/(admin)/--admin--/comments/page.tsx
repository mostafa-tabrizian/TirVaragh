import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/blog'

import Comments from './components/comments'

export const revalidate = 0

export const metadata = {
   title: 'پنل ادمین | کامنت ها',
   robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
         index: false,
         follow: false,
      },
   },
}

const getBlogs = async () => {
   await dbConnect()
   const blogs = await Blog.find()

   return blogs
}

const Adminblogs = async () => {
   const blogs = await getBlogs()

   return <Comments blogs={JSON.parse(JSON.stringify(blogs))} />
}

export default Adminblogs
