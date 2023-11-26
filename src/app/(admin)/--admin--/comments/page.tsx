import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/blog'

import Breadcrumbs from '@mui/material/Breadcrumbs'
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
               <Link className='text-gray-400' href='/--admin--/blogs'>
                  وبلاگ
               </Link>
               <h5 className='font-semibold'>کامنت ها</h5>
            </Breadcrumbs>

            <Comments blogs={JSON.parse(JSON.stringify(blogs))} />
         </>
      </div>
   )
}

export default Adminblogs
