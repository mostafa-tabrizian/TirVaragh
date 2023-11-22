'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Like = ({ userIP, blogId, likes }: { userIP: string; blogId: string; likes: [string] }) => {
   const router = useRouter()

   const [loading, setLoading] = useState(false)

   const [userLiked, setUserLiked] = useState(
      likes.length && userIP.length && likes.includes(userIP),
   )

   const onClick = async () => {
      try {
         if (!userIP.length) throw new Error('Couldnt get the ip!')

         setLoading(true)

         const res = await fetch('/api/client/blog/like', {
            method: 'POST',
            body: JSON.stringify({ blogId, userIP }),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData?.status == 404) return toast.error('خطایی در ثبت لایک رخ داد!')

         setUserLiked((prev) => !prev)

         router.refresh()
      } catch (err) {
         toast.error('خطایی در ثبت لایک رخ داد!')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <button
         onClick={onClick}
         disabled={loading}
         className='flex items-center gap-x-1 text-slate-700'
      >
         <span className={`yekan1 text-base ${userLiked ? 'text-rose-500' : 'text-inherit'}`}>
            {likes.length.toLocaleString('fa')}
         </span>
         {loading ? (
            <svg
               className='ml-1 h-5 w-5 animate-spin text-slate-700'
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
            >
               <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
               ></circle>
               <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
               ></path>
            </svg>
         ) : (
            <svg
               stroke='currentColor'
               fill='currentColor'
               strokeWidth={userLiked ? '0' : '2'}
               viewBox='0 0 24 24'
               aria-hidden='true'
               className={`h-6 w-6 ${userLiked ? 'fill-rose-500' : 'fill-transparent'}`}
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'></path>
            </svg>
         )}
      </button>
   )
}

export default Like
