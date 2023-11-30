import Link from 'next/link'

export default function NotFound() {
   return (
      <div className='mx-5 h-screen px-3 text-center md:mx-auto md:max-w-screen-lg'>
         <div className='grid h-screen items-center'>
            <div>
               <h2 className='text-center text-[6rem] font-bold'>خطای ۴۰۴</h2>
               <p className='text-[2rem] font-semibold'>! صفحه مورد نظر شما یافت نشد</p>
               <div>
                  <p className='text-xl'>
                     .احتمالا این صفحه به آدرس دیگری تغییر کرده یا حذف شده است
                  </p>
               </div>

               <div className='mt-10'>
                  <Link
                     href='/'
                     className='rounded-2xl bg-orange-600 p-2 px-4 text-lg text-white shadow-lg shadow-orange-300'
                  >
                     بازگشت به صفحه ی اصلی
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
