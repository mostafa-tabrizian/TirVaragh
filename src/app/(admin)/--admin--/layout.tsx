'use client'

import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <SessionProvider>
         <main className='mx-auto mb-24 max-w-screen-lg overflow-hidden'>{children}</main>
      </SessionProvider>
   )
}
