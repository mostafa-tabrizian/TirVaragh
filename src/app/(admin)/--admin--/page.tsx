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
               <div className='rounded-lg bg-white px-2 py-2 transition-all hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100'>
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

               <LogoutButton />
            </div>
         </>
      </div>
   )
}

export default AdminPanel
