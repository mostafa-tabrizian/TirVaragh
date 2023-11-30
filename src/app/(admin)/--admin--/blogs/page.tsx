import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/blog'

import BlogsTable from './components/blogsTable'

export const revalidate = 0

export const metadata = {
   title: 'پنل ادمین | جدول وبلاگ',
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

   return blogs.reverse()
}

const Adminblogs = async () => {
   const blogs = await getBlogs()

   return (
      <>
         <Link href='/--admin--/blogs/new'>
            <button className='fixed bottom-10 right-5 z-10 rounded-full border-2 border-orange-500 bg-white p-3'>
               <svg
                  className='h-6 w-6 text-orange-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>
            </button>
         </Link>

         <BlogsTable blogs={JSON.parse(JSON.stringify(blogs))} />
      </>
   )
}

export default Adminblogs
