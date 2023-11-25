import Image from 'next/image'
import { IBlog } from '@/models/blog'
import Link from 'next/link'

const BlogComponent = ({ blogs }: { blogs: IBlog[] }) => {
   return (
      <div className='mx-4 mt-14 md:mx-auto md:mt-36' id='blog'>
         <div>
            <div className='mt-7 flex items-center gap-1'>
               <span className='w-8 border-b-2 border-red-700'></span>
               <span className='text-sm font-bold text-red-700'>دانش و آگاهی</span>
            </div>
            <div>
               <h2 className='yekanExtraBold mt-2 text-3xl'>وبلاگ تیرورق</h2>
            </div>
         </div>

         <div className='mt-5 hidden grid-cols-2 gap-3 md:mt-12 md:grid'>
            <Link href={`/blog/${blogs[0].slug}`} key={blogs[0]._id}>
               <div className='relative h-full w-full'>
                  <div className='relative aspect-video h-full w-full object-cover'>
                     <Image
                        className='rounded-bl-xl rounded-tr-xl'
                        fill
                        src={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${blogs[0].thumbnail}`}
                        alt={blogs[0].title}
                     />
                  </div>
                  <div className=' absolute bottom-0 left-0 w-full rounded-bl-xl bg-gradient-to-t from-black to-transparent px-3'>
                     <span className='rounded-md bg-red-600 px-2 py-0.5 text-xs text-white'>
                        {blogs[0].readTime} دقیقه مطالعه
                     </span>
                     <h3 className='mt-1 pb-4 text-base font-medium text-white'>
                        {blogs[0].title}
                     </h3>
                  </div>
               </div>
            </Link>

            <div className='grid grid-cols-2 gap-5'>
               {blogs.slice(1).map((blog) => {
                  return (
                     <Link href={`/blog/${blog.slug}`} key={blog._id}>
                        <div className='relative'>
                           <div className='relative aspect-video h-full w-full object-cover'>
                              <Image
                                 className='rounded-bl-xl rounded-tr-xl'
                                 fill
                                 src={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${blog.thumbnail}`}
                                 alt={blog.title}
                              />
                           </div>
                           <div className=' absolute bottom-0 left-0 w-full rounded-bl-xl bg-gradient-to-t from-black to-transparent px-3'>
                              <span className='rounded-md bg-red-600 px-2 py-0.5 text-xs text-white'>
                                 {blog.readTime} دقیقه مطالعه
                              </span>
                              <h3 className='mt-1 pb-4 text-base font-medium text-white'>
                                 {blog.title}
                              </h3>
                           </div>
                        </div>
                     </Link>
                  )
               })}
            </div>
         </div>

         <div className='mt-5 grid grid-cols-2 gap-3 md:mt-12 md:hidden'>
            {blogs.map((blog) => {
               return (
                  <Link href={`/blog/${blog.slug}`} key={blog._id}>
                     <div className='relative'>
                        <div className='relative h-28 w-full object-cover'>
                           <Image
                              className='rounded-bl-xl rounded-tr-xl'
                              fill
                              src={`https://tabrizian.storage.iran.liara.space/tir-varagh/blogs/thumbnail/${blog.thumbnail}`}
                              alt={blog.title}
                           />
                        </div>
                        <div className=' absolute bottom-0 left-0 w-full rounded-bl-xl bg-gradient-to-t from-black to-transparent px-3'>
                           <span className='rounded-md bg-red-600 px-2 py-0.5 text-xs text-white'>
                              {blog.readTime} دقیقه مطالعه
                           </span>
                           <h3 className='mt-1 pb-4 text-base font-medium text-white'>
                              {blog.title}
                           </h3>
                        </div>
                     </div>
                  </Link>
               )
            })}
         </div>
      </div>
   )
}

export default BlogComponent
