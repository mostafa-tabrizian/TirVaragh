import Link from 'next/link'
import Image from 'next/image'
import LinksForDesktop from './headerLinksforDesktop'

const Header = () => {
   return (
      <header className='fixed left-1/2 top-0 z-20 mx-auto w-full max-w-screen-xl -translate-x-1/2 bg-[#f4f5f7] p-3'>
         <div className='flex items-center justify-between'>
            <div>
               <Link
                  aria-label='صفحه اصلی'
                  href='/'
                  className='relative flex aspect-video h-20 gap-3 md:col-span-1 md:justify-center'
               >
                  <Image
                     className='object-contain'
                     alt='لوگو پارس شیت'
                     priority
                     src='/logo-color.svg'
                     fill
                  />
               </Link>
            </div>

            <LinksForDesktop />

            <div className='space-y-3'>
               <a
                  id='call-to-action'
                  href='tel:+2191692222'
                  className='z-10 flex items-center gap-3 rounded-xl bg-gradient-to-b from-[#f2a60f] to-[#f2920f] px-2 py-1 shadow-md shadow-[#f2930f95]'
                  title='تماس تلفنی با پشتیبانی'
               >
                  <span className='text-lg font-normal text-white'>۰۲۱-۵۵۲۲۸۳۰۰</span>
                  <svg
                     className='h-6 w-6 text-orange-600'
                     fill='white'
                     viewBox='0 0 24 24'
                     stroke='currentColor'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1'
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                     />
                  </svg>
               </a>
               <a
                  id='call-to-action'
                  href='tel:+9356188787'
                  className='z-10 flex items-center gap-3 rounded-xl bg-gradient-to-b from-[#f2920f] to-orange-500 px-2 py-1 shadow-md shadow-orange-300'
                  title='تماس تلفنی با پشتیبانی'
               >
                  <span className='text-lg font-normal text-white'>۰۹۳۵۶۱۸۸۷۸۷</span>
                  <svg
                     className='h-6 w-6 text-orange-600'
                     fill='white'
                     viewBox='0 0 24 24'
                     stroke='currentColor'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1'
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                     />
                  </svg>
               </a>
            </div>
         </div>
      </header>
   )
}

export default Header
