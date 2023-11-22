import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/blog'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import BlogsTable from './components/blogsTable'

export const revalidate = 0

export const metadata = {
   title: 'پنل ادمین | جدول وبلاگ',
}

const getBlogs = async () => {
   await dbConnect()
   const blogs = await Blog.find()

   return blogs.reverse()
}

const Adminblogs = async () => {
   const blogs = await getBlogs()

   return (
      <div className='relative mx-6 my-16 max-w-screen-lg space-y-10 md:mx-auto'>
         <>
         <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     تیرورق
                  </Link>
                  <Link className='text-gray-400' href='/--admin--'>
                     ادمین
                  </Link>
                  <h5 className='font-semibold'>وبلاگ</h5>
               </Breadcrumbs>

            <Link href='/--admin--/blogs/new'>
               <button className='fixed bottom-10 right-5 z-10 rounded-full border-2 border-indigo-500 bg-white p-3'>
                  <svg
                     className='h-6 w-6 text-indigo-500'
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
      </div>
   )
}

export default Adminblogs
