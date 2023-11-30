import dbConnect from '@/lib/dbConnect'
import User from '@/lib/user'
import Blog from '@/models/blog'
import Form from './components/form'

const fetchBlog = async (_id: string) => {
   try {
      await dbConnect()
      return await Blog.findById(_id)
   } catch (error) {
      console.error('در دریافت اطلاعات بلاگ خطایی رخ داد:', error)
      return
   }
}

const NewBlog = async ({ params: { _id } }: { params: { _id: string } }) => {
   const user: { _id: string } = await User()
   const newBlog = _id === 'new'

   const blogData = !newBlog && (await fetchBlog(_id))

   return (
      <div className='relative'>
         {newBlog || blogData ? (
            <Form
               data={JSON.parse(
                  JSON.stringify({
                     authorId: user._id,
                     _idQuery: _id,
                     blogData,
                  }),
               )}
            />
         ) : (
            <h1>بلاگی پیدا نشد!</h1>
         )}
      </div>
   )
}

export default NewBlog
