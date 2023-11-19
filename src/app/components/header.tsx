import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LinksForDesktop from './headerLinksforDesktop'
import { ICategory } from '@/models/category'
import { IBrand } from '@/models/brand'

const Header = memo(
   ({
      params: { categories, brands },
   }: {
      params: { categories: ICategory[]; brands: IBrand[] }
   }) => {
      return (
         <header className='p-3'>
            <div className='flex justify-between'>
               <div>
                  <Link
                     aria-label='صفحه اصلی'
                     href='/'
                     className='flex gap-3 md:col-span-1 md:justify-center'
                  >
                     <Image
                        className='object-contain'
                        src={'https://tabrizian.storage.iran.liara.space/tirvaragh/logo/logo.jpg'}
                        alt='لوگو تیرورق'
                        width={80}
                        height={80}
                        quality={100}
                        objectFit='contain'
                        loading='lazy'
                     />
                  </Link>
               </div>
               <div>
                  <a
                     aria-label='تماس تلفنی'
                     id='phone_call'
                     href='tel:+989128530920'
                     className='z-10 flex items-center gap-3 rounded-xl bg-red-600 px-2 py-1 shadow-lg shadow-red-300'
                     title='تماس تلفنی با پشتیبانی'
                  >
                     <span className='text-lg text-white'>۰۲۱-۹۱۶۹۲۲۲۲</span>
                     <svg
                        className='h-6 w-6 text-red-600'
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

            {/* <LinksForDesktop categoriesList={categories} brandsList={brands} /> */}
         </header>
      )
   },
)

Header.displayName = 'Header'

export default Header
