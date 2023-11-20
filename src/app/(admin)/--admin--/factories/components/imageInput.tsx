'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import Button from '@mui/material/Button'

const FactoryImageInput = ({ factoryId }: { factoryId: string }) => {
   const router = useRouter()

   const handleSubmit = async (files: FileList) => {
      try {
         toast.info('در حال ثبت لوگو...')

         const image = Object.values(files)[0]
         const imageHandleRes = await imageUploadHandler(image as File, 'factories')

         if (!imageHandleRes) return false

         const payload = { _id: factoryId, logo: imageHandleRes.imageKey }

         const dbRes = await fetch('/api/--admin--/factory/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         const dbResData = await dbRes.json()

         if (!dbRes.ok) throw new Error()
         else if (dbResData.status == 500) {
            console.error(dbResData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         toast.success('لوگو با موفقیت ثبت گردید')
         return router.refresh()
      } catch (err) {
         toast.warning('در ثبت لوگو خطایی رخ داد')
         return console.error(err)
      }
   }

   const onImagesSelected = (files: FileList | null) => {
      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes = filesTypeValidation(filesList)
      if (!typeCheckRes) return

      const sizeCheckRes = filesSizeValidation(filesList)
      if (!sizeCheckRes) return

      handleSubmit(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   const dropHandlerImage = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
      else if (files.length !== 1)
         return toast.warning(
            'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. لوگو می‌بایست یک عدد باشد',
         )

      onImagesSelected(files)
   }

   return (
      <div
         onDrop={dropHandlerImage}
         onDragOver={dragOverHandler}
         className='h-10 w-16 rounded-lg border-2 border-slate-200 bg-slate-100 text-sm'
      >
         <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
            <span className='text-slate-400'>+</span>
            <input
               hidden
               accept='image/*'
               type='file'
               name='imageToUpload'
               onChange={(e) => onImagesSelected(e?.target?.files)}
            />
         </Button>
      </div>
   )
}

export default FactoryImageInput
