'use client'

import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { CategoryValidation } from '@/formik/schema/validation'

const NameActiveEdit = ({
   params,
}: {
   params: { _doc: { _id: string; name: string; active: boolean } }
}) => {
   const name = params._doc.name.charAt(0).toUpperCase() + params._doc.name.slice(1)
   const active = params._doc.active

   const handleSubmit = async ({ name, active }: { name: string; active: boolean }) => {
      toast.info('در حال ثبت تغییرات...')

      const payload = {
         _id: params._doc._id,
         name: name.trim(),
         active,
      }

      try {
         const res = await fetch('/api/--admin--/factory', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         return toast.success('نام دسته بندی با موفقیت تغییر یافت')
      } catch (err) {
         toast.error('در تغییر نام دسته بندی خطایی رخ داد')
         return console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{ name, active }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched, submitForm }) => (
            <Form className='rtl col-span-3 grid w-full grid-cols-3 items-start'>
               <div className='col-span-2'>
                  <div className='ml-2 space-y-1 text-right'>
                     <input
                        disabled={isSubmitting}
                        placeholder='نام'
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='w-full bg-transparent text-sm'
                        type='text'
                        onKeyDown={(e) => {
                           if (e.key == 'Enter') submitForm()
                        }}
                     />
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>
               <button type='submit' onClick={() => setFieldValue('active', !values.active)}>
                  {values.active ? (
                     <svg
                        className='h-5 w-5 text-green-700'
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
                        <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                        <path d='M9 12l2 2l4 -4' />
                     </svg>
                  ) : (
                     <svg
                        className='h-5 w-5 text-rose-700'
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
                        <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                        <path d='M10 10l4 4m0 -4l-4 4' />
                     </svg>
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default NameActiveEdit
