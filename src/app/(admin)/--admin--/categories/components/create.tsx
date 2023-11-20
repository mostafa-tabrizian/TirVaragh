'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import { CategoryValidation } from '@/formik/schema/validation'

const CategoryNewInput = () => {
   const router = useRouter()

   const handleSubmit = async (
      { name }: { name: string },
      { resetForm }: { resetForm: () => void },
   ) => {
      toast.info('در حال ثبت دسته بندی جدید...')

      const payload = { name: name.trim() }

      try {
         const res = await fetch('/api/--admin--/category', {
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

   return (
      <Formik
         initialValues={{
            name: '',
         }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='rtl flex w-full items-start justify-center space-x-3 space-x-reverse'>
               <div>
                  <div className='mr-3 space-y-1 text-right'>
                     <input
                        placeholder='نام'
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='rtl w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                        type='text'
                     />

                     {errors.name && touched.name ? (
                        <p className='text-right text-sm text-red-500'>{errors.name}</p>
                     ) : (
                        ''
                     )}
                  </div>
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
