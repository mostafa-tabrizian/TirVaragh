import Link from 'next/link'

const HeaderLinksforDesktop = () => {
   return (
      <ul className='rtl hidden items-center justify-center space-x-10 space-x-reverse text-gray-700 md:col-span-3 md:flex'>
         <li className='block border-l-2 border-slate-500/50 pl-10'>
            <Link href='/'>
               <span className='py-1 text-base font-bold text-gray-700 transition hover:text-red-600'>
                  صفحه اصلی
               </span>
            </Link>
         </li>
         <li className='block border-l-2 border-slate-500/50 pl-10'>
            <Link href='/#category'>
               <span className='py-1 text-base font-bold text-gray-700 transition hover:text-red-600'>
                  دسته بندی ها
               </span>
            </Link>
         </li>
         <li className='block border-l-2 border-slate-500/50 pl-10'>
            <Link href='/#price-table'>
               <span className='py-1 text-base font-bold text-gray-700 transition hover:text-red-600'>
                  جدول قیمت
               </span>
            </Link>
         </li>
         <li className='block border-l-2 border-slate-500/50 pl-10'>
            <Link href='/#about-us'>
               <span className='py-1 text-base font-bold text-gray-700 transition hover:text-red-600'>
                  درباره ما
               </span>
            </Link>
         </li>
         <li className='block'>
            <Link href='/#blog'>
               <span className='py-1 text-base font-bold text-gray-700 transition hover:text-red-600'>
                  وبلاگ
               </span>
            </Link>
         </li>
      </ul>
   )
}

export default HeaderLinksforDesktop
