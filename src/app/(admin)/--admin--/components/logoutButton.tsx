'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import CircularProgress from '@mui/material/CircularProgress'

const LogoutButton = () => {
   const [loading, setLoading] = useState(false)

   const handleLogout = () => {
      setLoading(true)
      signOut({ callbackUrl: '/' })
   }

   return (
      <div className='flex items-center rounded-xl bg-white transition-all hover:cursor-pointer hover:border-rose-600 hover:shadow-lg hover:shadow-rose-100'>
         {loading ? (
            <div className='mx-auto flex py-3'>
               <CircularProgress className='text-rose-600' color='inherit' size={24} />
            </div>
         ) : (
            <button disabled={loading} onClick={handleLogout}>
               <div className='flex items-center mr-1'>
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
                     <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />{' '}
                     <path d='M7 12h14l-3 -3m0 6l3 -3' />
                  </svg>
                  <span className='text-base'>خروج</span>
               </div>
            </button>
         )}
      </div>
   )
}

export default LogoutButton
