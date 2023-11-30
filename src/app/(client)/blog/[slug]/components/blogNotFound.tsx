import Link from 'next/link'

const BlogNotFound = () => {
   return (
      <div className='mx-5 h-[50rem] px-3 text-center md:mx-auto md:max-w-screen-lg'>
         <div className='grid h-[50rem] items-center'>
            <div className='relative'>
               <h2 className='yekanBold text-center text-[3rem] font-bold md:text-[6rem]'>
                  ارور{' '}
                  <span className='yekanBold text-[4rem] font-bold text-red-500 md:text-[7rem]'>
                     ۴۰۴
                  </span>
               </h2>
               <span className='absolute -top-[14rem] right-0 -z-10 h-[40rem] w-[40rem] bg-gradient-radial from-orange-300 via-transparent to-transparent'></span>

               <p className='yekanBold text-[1.4rem] font-semibold md:text-[2rem]'>
                  ! بلاگ مورد نظر پیدا نشد
               </p>

               <div>
                  <p className='yekan1 text-lg'>
                     .به نظر میرسه صفحه ای که دنبالش هستید وجود نداره یا مسیرش تغییر کرده
                  </p>
               </div>

               <div className='mt-10'>
                  <Link
                     href='/fa'
                     className='yekan1 rounded-2xl bg-red-500 px-4 py-2 text-lg text-white shadow-md shadow-red-800'
                  >
                     بازگشت به صفحه اصلی
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogNotFound
