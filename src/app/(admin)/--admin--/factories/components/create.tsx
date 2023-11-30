'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import { CategoryValidation } from '@/formik/schema/validation'
import { useMemo, useState } from 'react'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import Button from '@mui/material/Button'
import Image from 'next/image'
import axios from 'axios'
import Switch from '@mui/material/Switch'

const CategoryNewInput = () => {
   const router = useRouter()

   const [imageToUpload, setImageToUpload] = useState<FileList | null>(null)

   const imageToUploadMemo = useMemo(() => {
      return imageToUpload && Object.values(imageToUpload)
   }, [imageToUpload])

   const uploadFiles = async () => {
      if (!imageToUpload || !imageToUploadMemo) {
         toast.warning('هیچ لوگویی برای آپلود انتخاب نشده است!')
         return false
      }

      const image = imageToUploadMemo[0]

      const imageName = image.name.replace(' ', '-')

      const data = new FormData()
      data.append('image', image)
      data.append('folder', 'factories')
      data.append('imageName', imageName)

      const res = await axios.request({
         method: 'post',
         url: '/api/--admin--/image/s3',
         data,
      })

      return res.data['imageKey']
   }

   const handleSubmit = async (
      { name, active }: { name: string; active: boolean },
      { resetForm }: { resetForm: () => void },
   ) => {
      try {
         toast.info('در حال ثبت اطلاعات کارخانه...')

         const imageKey = await uploadFiles()

         if (!imageKey) return false

         const payload = { name: name.trim(), logo: imageKey, active }

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
         setImageToUpload(null)
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
            active: false,
         }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='rtl grid w-full grid-cols-4 items-start justify-center md:grid-cols-6'>
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
                     className='h-10 w-full rounded-lg border-2 border-slate-100 bg-slate-50 text-sm'
                  >
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='text-slate-700'>آپلود لوگو +</span>
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

               <div className='mr-3 w-full space-y-1 text-right md:col-span-3'>
                  <input
                     placeholder='نام کارخانه...'
                     name='name'
                     onChange={(e) => setFieldValue('name', e.target.value)}
                     value={values.name}
                     className='rtl w-full rounded-lg border-2 border-slate-100 bg-slate-50 p-2 text-sm placeholder:font-normal'
                     type='text'
                  />

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>

               <div className='flex w-full justify-center text-center'>
                  <Switch
                     disabled={isSubmitting}
                     checked={values.active}
                     name='active'
                     color='success'
                     onChange={() => setFieldValue('active', !values.active)}
                  />
                  <span className='flex items-center text-xs text-slate-700'>فعال</span>
               </div>

               <button type='submit' className='w-full p-0'>
                  {isSubmitting ? (
                     <svg
                        className='h-7 w-7 animate-spin text-slate-700'
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
                     <span className='flex w-full items-center justify-center rounded-lg border-2 border-slate-100 bg-slate-50 px-4 py-2'>
                        ثبت
                     </span>
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default CategoryNewInput
