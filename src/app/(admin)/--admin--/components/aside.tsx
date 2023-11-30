'use client'

import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './logoutButton'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Aside = () => {
   const pathname = usePathname()
   const [show, setShow] = useState(false)

   useEffect(() => {
      setShow(false)

      return () => {
         setShow(false)
      }
   }, [pathname])

   return (
      <>
         <button
            onClick={() => setShow((prev) => !prev)}
            className='absolute right-0 top-0 z-10 rounded-xl p-2 backdrop-blur-md md:hidden'
         >
            {show ? (
               <svg
                  className='h-14 w-14 text-orange-500'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
                  <line x1='6' y1='6' x2='18' y2='18' />
               </svg>
            ) : (
               <svg
                  className='h-14 w-14 text-orange-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M4 6h16M4 12h16m-7 6h7'
                  />
               </svg>
            )}
         </button>
         <div className='relative z-10'>
            <div
               className={`md:bd-inherit fixed right-6 top-16 w-fit rounded-xl bg-white p-4 shadow-lg transition-transform duration-500 ease-in-out md:right-auto md:top-auto md:translate-x-0 md:bg-transparent md:shadow-none ${
                  show ? 'translate-x-0' : 'translate-x-[110%]'
               }`}
            >
               <div className='relative aspect-video w-60'>
                  <Link href='/'>
                     <Image alt='logo' priority src='/logo-color.svg' fill />
                  </Link>
               </div>
               <div className='mt-10 w-60 space-y-4'>
                  <Link
                     className={` ${
                        pathname.includes('products')
                           ? ' bg-gradient-to-tl from-[#eb6b56] to-orange-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-orange-700/10 transition-shadow hover:shadow-lg hover:shadow-orange-100`}
                     href='/--admin--/products'
                  >
                     <svg
                        className='h-7 w-7'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='1'
                           d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                        />
                     </svg>
                     <span className='text-base font-normal text-inherit'>محصولات</span>
                  </Link>

                  <Link
                     className={` ${
                        pathname.includes('categories')
                           ? ' bg-gradient-to-tl from-[#eb6b56] to-orange-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-orange-700/10 transition-shadow hover:shadow-lg hover:shadow-orange-100`}
                     href='/--admin--/categories'
                  >
                     <svg
                        className='h-7 w-7'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <rect x='4' y='4' width='6' height='6' rx='1' />{' '}
                        <rect x='14' y='4' width='6' height='6' rx='1' />{' '}
                        <rect x='4' y='14' width='6' height='6' rx='1' />{' '}
                        <rect x='14' y='14' width='6' height='6' rx='1' />
                     </svg>
                     <span className='text-base font-normal text-inherit'>دسته بندی ها</span>
                  </Link>

                  <Link
                     className={` ${
                        pathname.includes('factories')
                           ? ' bg-gradient-to-tl from-[#eb6b56] to-orange-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-orange-700/10 transition-shadow hover:shadow-lg hover:shadow-orange-100`}
                     href='/--admin--/factories'
                  >
                     <svg
                        className='h-7 w-7'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path
                           stroke='none'
                           d='M0 0h24v24H0z'
                        /> <path d='M3 21v-13l9-4l9 4v13' /> <path d='M13 13h4v8h-10v-6h6' />{' '}
                        <path d='M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3' />
                     </svg>
                     <span className='text-base font-normal text-inherit'>کارخانه ها</span>
                  </Link>

                  <Link
                     className={` ${
                        pathname.includes('blogs')
                           ? ' bg-gradient-to-tl from-[#eb6b56] to-orange-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-orange-500/10 transition-shadow hover:shadow-lg hover:shadow-orange-100`}
                     href='/--admin--/blogs'
                  >
                     <svg className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='1'
                           d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                        />
                     </svg>
                     <span className='text-base font-normal text-inherit'>وبلاگ</span>
                  </Link>

                  <Link
                     className={` ${
                        pathname.includes('comments')
                           ? ' bg-gradient-to-tl from-[#eb6b56] to-orange-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-orange-700/10 transition-shadow hover:shadow-lg hover:shadow-orange-100`}
                     href='/--admin--/comments'
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        className='h-7 w-7'
                     >
                        <path
                           stroke='currentColor'
                           strokeLinecap='round'
                           strokeWidth='1'
                           d='M8.696 9.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 0 0 0-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 0 0-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 0 1 .797-.563Z'
                        ></path>
                     </svg>
                     <span className='text-base font-normal text-inherit'>کامنت ها</span>
                  </Link>

                  <LogoutButton />
               </div>
            </div>
         </div>
      </>
   )
}

export default Aside
