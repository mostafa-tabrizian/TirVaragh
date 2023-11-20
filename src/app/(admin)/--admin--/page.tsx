import User from '@/lib/user'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import LogoutButton from './components/logoutButton'

export const metadata = {
   title: 'تیرورق | پنل ادمین',
}

const AdminPanel = async () => {
   const user = await User()

   return (
      <div className='mx-6 my-16 space-y-10'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  تیرورق
               </Link>
               <h5 className='font-semibold'>ادمین</h5>
            </Breadcrumbs>

            <div className='text-center'>
               <h1 className='font-semibold'> {user.username} </h1>
               <h2 className='ext-zinc-400 text-base'> به پنل ادمین خوش آمدید </h2>
            </div>

            <div className='mx-auto max-w-sm space-y-4 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10'>
               <div className='rounded-lg bg-white px-2 py-2 transition-all hover:border-red-600 hover:shadow-lg hover:shadow-red-100'>
                  <Link href='/--admin--/products'>
                     <div className='flex items-center'>
                        <svg
                           className='ml-3 h-7 w-7'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                           />
                        </svg>
                        <span className='text-base'>محصولات</span>
                     </div>
                  </Link>
               </div>

               <div className='rounded-lg bg-white px-2 py-2 transition-all hover:border-red-600 hover:shadow-lg hover:shadow-red-100'>
                  <Link href='/--admin--/categories'>
                     <div className='flex items-center space-x-3'>
                        <svg
                           className='ml-3 h-7 w-7'
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
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <rect x='4' y='4' width='6' height='6' rx='1' />{' '}
                           <rect x='14' y='4' width='6' height='6' rx='1' />{' '}
                           <rect x='4' y='14' width='6' height='6' rx='1' />{' '}
                           <rect x='14' y='14' width='6' height='6' rx='1' />
                        </svg>
                        <span className='text-base text-black'>دسته بندی ها</span>
                     </div>
                  </Link>
               </div>

               <div className='rounded-lg bg-white px-2 py-2 transition-all hover:border-red-600 hover:shadow-lg hover:shadow-red-100'>
                  <Link href='/--admin--/factories'>
                     <div className='flex items-center space-x-3'>
                        <svg
                           className='h-8 w-8 ml-3'
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
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <path d='M3 21v-13l9-4l9 4v13' /> <path d='M13 13h4v8h-10v-6h6' />{' '}
                           <path d='M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3' />
                        </svg>
                        <span className='text-base text-black'>کارخانه ها</span>
                     </div>
                  </Link>
               </div>

               <LogoutButton />
            </div>
         </>
      </div>
   )
}

export default AdminPanel
