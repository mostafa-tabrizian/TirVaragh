'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress'
import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'

const DeleteButton = ({
   params: { _id, imageKey, ableToDelete },
}: {
   params: { _id: string; imageKey: string; ableToDelete: boolean }
}) => {
   const [loading, setLoading] = useState(false)

   const router = useRouter()

   const handleDelete = async () => {
      setLoading(true)

      try {
         const fileUploadResult = await deleteFromS3Bucket(imageKey, 'factories')
         if (!fileUploadResult) throw new Error('file upload to s3')
         return fileUploadResult
      } catch (error) {
         toast.error(
            'در حذف تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
         return false
      } finally {
         setLoading(false)
      }
   }

   const deleteHandler = async () => {
      setLoading(true)

      const deleteRes = await handleDelete()
      if (!deleteRes) return

      const payload = { _id }

      try {
         const res = await fetch('/api/--admin--/factory', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('کارخانه با موفقیت حذف گردید')
         router.refresh()
      } catch (err) {
         toast.error('در حذف کارخانه خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         {ableToDelete ? (
            <>
               {loading ? (
                  <div className='my-1 flex justify-end'>
                     <CircularProgress color='error' size={20} />
                  </div>
               ) : (
                  <button className='flex justify-end' onClick={() => deleteHandler()}>
                     <svg
                        className='h-4 w-4 text-rose-500'
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
                        <line x1='4' y1='7' x2='20' y2='7' />{' '}
                        <line x1='10' y1='11' x2='10' y2='17' />{' '}
                        <line x1='14' y1='11' x2='14' y2='17' />{' '}
                        <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />{' '}
                        <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                     </svg>
                  </button>
               )}
            </>
         ) : (
            ''
         )}
      </>
   )
}

export default DeleteButton
