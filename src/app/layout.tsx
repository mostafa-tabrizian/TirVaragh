'use client'

import '@/app/styles/globals.scss'
import '@/app/styles/mui.scss'
import '@/app/styles/lightbox.scss'

import 'react-toastify/dist/ReactToastify.min.css'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      console.log(
         `%c
      _______    _          _     _             
     |__   __|  | |        (_)   (_)            
        | | __ _| |__  _ __ _ _____  __ _ _ __  
        | |/ _\` | '_ \\| '__| |_  / |/ _\` | '_ \\ 
        | | (_| | |_) | |  | |/ /| | (_| | | | |
        |_|\\__,_|_.__/|_|  |_/___|_|\\__,_|_| |_|
        Telegram: @Tabrizian_dev
   `,
         'color: #2495ff; font-weight: bold;',
      )
   }, [])

   return (
      <html lang='IR-FA'>
         <meta name='color-scheme' content='light only' />
         <body>
            <SessionProvider>
               <ToastContainer
                  position='top-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
               />

               <main className='rtl mx-auto overflow-x-hidden'>{children}</main>
            </SessionProvider>
         </body>
      </html>
   )
}
