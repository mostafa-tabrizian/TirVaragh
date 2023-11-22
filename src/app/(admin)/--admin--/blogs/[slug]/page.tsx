import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs'

import dbConnect from '@/lib/dbConnect'
import User from '@/lib/user'
import Blog from '@/models/blog'
import Form from './components/form'

const fetchBlog = async (slug: string) => {
   try {
      await dbConnect()
      return await Blog.findOne({ slug })
   } catch (error) {
      console.error('در دریافت اطلاعات بلاگ خطایی رخ داد:', error)
      return
   }
}

const NewBlog = async ({ params: { slug } }: { params: { slug: string } }) => {
   const user: { _id: string } = await User()
   const newBlog = slug === 'new'

   const blogData = !newBlog && (await fetchBlog(slug))

   return (
      <div className='relative mx-6 my-16 max-w-screen-xl space-y-10 md:mx-auto'>
         {newBlog || blogData ? (
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
                  <h5 className='font-semibold'>{newBlog ? 'بلاگ جدید' : blogData.title}</h5>
               </Breadcrumbs>

               <Form
                  data={JSON.parse(
                     JSON.stringify({
                        authorId: user._id,
                        slugQuery: slug,
                        blogData,
                     }),
                  )}
               />
            </>
         ) : (
            <h1>بلاگی پیدا نشد!</h1>
         )}
      </div>
   )
}

export default NewBlog
