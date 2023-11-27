'use client'

import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ImageDelete = ({
   setThumbnail,
   blogId,
   imageKey,
}: {
   setThumbnail: React.Dispatch<React.SetStateAction<string | File | null>>
   blogId: string
   imageKey: string | File | null
}) => {
   const [loading, setLoading] = useState(false)
   const [confirmation, setConfirmation] = useState(false)

   const router = useRouter()

   const handleDelete = async () => {
      setConfirmation(false)

      if (!imageKey) {
         return toast.warning('در حین حذف تصویر خطایی رخ داد!')
      }

      if (!blogId) {
         return toast.error('لطفا ابتدا صفحه را رفرش کنید!')
      }

      setLoading(true)

      try {
         const fileDeleteResult = await deleteFromS3Bucket(imageKey as string, 'blogs/thumbnail')

         if (!fileDeleteResult) throw new Error('file upload to s3')

         return await removeFromDb()
      } catch (error) {
         toast.error('خطایی در آپلود تصویر رخ داد. در صورت روشن بودن وی پی ان، آن را خاموش کنید')
         return console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const removeFromDb = async () => {
      const payload = {
         type: 'blogs/thumbnail',
         imageKey,
         _id: blogId,
      }

      try {
         const res = await fetch('/api/--admin--/image/db', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('تصویر با موفقیت حذف گردید.')

         fetch('/api/--admin--/revalidate?path=/')

         setThumbnail(null)
         router.refresh()
      } catch (err) {
         toast.error('حین حذف تصویر خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <div className='absolute -top-6 left-0 flex items-center space-x-3'>
            {loading ? (
               <svg
                  className='h-5 w-5 animate-spin text-slate-700'
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
               <button type='button' onClick={() => setConfirmation(true)}>
                  <svg
                     className='h-5 w-5 text-slate-700'
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
               </button>
            )}
         </div>

         <Dialog onClose={() => setConfirmation(false)} open={confirmation}>
            <div className='space-y-5 p-5 text-center'>
               <svg
                  className='mx-auto h-16 w-16 text-rose-500'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <circle cx='12' cy='12' r='10' /> <line x1='15' y1='9' x2='9' y2='15' />{' '}
                  <line x1='9' y1='9' x2='15' y2='15' />
               </svg>
               <h1>آیا مطمئن هستید؟</h1>
               <span className='font-semibold'>
                  پس از حذف تصویر, دیگر قابل بازگشت نمی‌باشد <br /> آیا برای حذف تصویر مطمئن هستید؟
               </span>
               <div className='flex justify-around space-x-5'>
                  <button
                     onClick={() => setConfirmation(false)}
                     className='w-full rounded bg-slate-300 py-1'
                  >
                     لغو
                  </button>
                  <button
                     onClick={handleDelete}
                     className='w-full rounded bg-rose-500 py-1 text-white'
                  >
                     حذف
                  </button>
               </div>
            </div>
         </Dialog>
      </>
   )
}

export default ImageDelete
