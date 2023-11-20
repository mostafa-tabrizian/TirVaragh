'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import { CategoryValidation } from '@/formik/schema/validation'
import { useMemo, useState } from 'react'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import Button from '@mui/material/Button'
import Image from 'next/image'

const CategoryNewInput = () => {
   const router = useRouter()

   const [imageToUpload, setImageToUpload] = useState<FileList | null>(null)

   const imageToUploadMemo = useMemo(() => {
      return imageToUpload && Object.values(imageToUpload)
   }, [imageToUpload])

   const handleImageSubmit = async () => {
      if (!imageToUpload || !imageToUploadMemo) {
         toast.warning('هیچ لوگویی برای آپلود انتخاب نشده است!')
         return false
      }

      try {
         const image = imageToUploadMemo[0]
         const res = await imageUploadHandler(image, 'factories')
         if (res) {
            return res
         }
         toast.error('در آپلود تصویر خطایی رخ داد.')
         return false
      } catch (error) {
         console.error(error)
         return false
      }
   }

   const handleSubmit = async (
      { name }: { name: string },
      { resetForm }: { resetForm: () => void },
   ) => {
      try {
         toast.info('در حال ثبت اطلاعات کارخانه...')

         const imageRes = await handleImageSubmit()

         if (!imageRes) return false

         const payload = { name: name.trim(), logo: imageRes.imageKey }

         const res = await fetch('/api/--admin--/factory', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         toast.success('دسته بندی با موفقیت ثبت گردید')
         resetForm()
         return router.refresh()
      } catch (err) {
         toast.warning('در ثبت دسته بندی خطایی رخ داد')
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

      setImageToUpload(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   const dropHandlerImage = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
      else if (files.length !== 1)
         return toast.warning(
            'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. تامبنیل می‌بایست یک عدد باشد',
         )

      onImagesSelected(files)
   }

   return (
      <Formik
         initialValues={{
            name: '',
            logo: '',
         }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='rtl flex w-full items-center justify-center gap-3'>
               {imageToUploadMemo?.length ? (
                  <div>
                     {imageToUploadMemo.map((imageData: File) => {
                        return (
                           <Image
                              key={imageData.name}
                              className='rounded-xl object-contain'
                              src={URL.createObjectURL(imageData)}
                              alt={imageData.name}
                              width='80'
                              height='80'
                           />
                        )
                     })}
                  </div>
               ) : (
                  <div
                     onDrop={dropHandlerImage}
                     onDragOver={dragOverHandler}
                     className='h-10 w-24 rounded-lg border-2 border-slate-200 bg-slate-100 text-sm'
                  >
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='text-slate-400'>آپلود لوگو +</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='imageToUpload'
                           onChange={(e) => onImagesSelected(e?.target?.files)}
                           disabled={isSubmitting}
                        />
                     </Button>
                  </div>
               )}

               <div className='mr-3 space-y-1 text-right'>
                  <input
                     placeholder='نام'
                     name='name'
                     onChange={(e) => setFieldValue('name', e.target.value)}
                     value={values.name}
                     className='rtl w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm placeholder:font-normal'
                     type='text'
                  />

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>

               <button type='submit'>
                  {isSubmitting ? (
                     <CircularProgress color='success' size={25} />
                  ) : (
                     <svg
                        className='h-8 w-8 text-slate-500'
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
                        <line x1='12' y1='5' x2='12' y2='19' />{' '}
                        <line x1='5' y1='12' x2='19' y2='12' />
                     </svg>
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default CategoryNewInput
