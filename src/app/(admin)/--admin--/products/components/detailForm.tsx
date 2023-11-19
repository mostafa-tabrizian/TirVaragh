'use client'

import { memo } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { IProduct } from '@/models/product'

import { Switch } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { ProductForm } from '@/formik/schema/validation'

const DetailForm = memo(
   ({ addingNewProduct, product }: { addingNewProduct: boolean; product: IProduct }) => {
      const handleSubmit = async (
         values: {
            active: boolean
            title: string
            category: string
            price: number
            length: number
            width: number
            thickness: number
            inStock: boolean
         },
         { resetForm }: { resetForm: () => void },
      ) => {
         try {
            toast.info('در حال ثبت اطلاعات محصول...')

            const payload = {
               _id: addingNewProduct ? null : product._id,
               ...values,
            }

            const res = await fetch('/api/--admin--/product', {
               method: addingNewProduct ? 'POST' : 'PATCH',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status == 500) {
               console.error(resData.message)
               return toast.error('خطا در برقراری ارتباط')
            }

            toast.success('اطلاعات محصول با موفقیت ثبت گردید.')
            return resetForm()
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         }
      }

      return (
         <Formik
            initialValues={{
               active: addingNewProduct ? true : product.active,
               title: addingNewProduct ? '' : product.title,
               category: addingNewProduct ? '' : product.category,
               price: addingNewProduct ? 0 : product.price[product.price.length - 1].value,
               length: addingNewProduct ? 0 : product.length,
               width: addingNewProduct ? 0 : product.width,
               thickness: addingNewProduct ? 0 : product.thickness,
               inStock: addingNewProduct ? true : product.inStock,
            }}
            validationSchema={ProductForm}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='mt-6 space-y-5'>
                  <div className='space-y-1 text-right'>
                     <label htmlFor='title'>
                        <span className='text-slate-600'>عنوان محصول</span>
                     </label>
                     <input
                        name='title'
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        value={values.title}
                        className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                        type='text'
                     />
                     <p className='text-xs font-normal text-slate-400'>
                        برای سئوی بهتر لطفا عنوان کامل را وارد کنید. برای مثال:{' '}
                        <span className='font-bold text-slate-400'>
                           ورق روغنی ۴ میل ابعاد ۲۰۰۰x۱۰۰۰
                        </span>
                     </p>
                  </div>

                  {errors.title && touched.title ? (
                     <p className='text-sm text-red-500'>{errors.title}</p>
                  ) : (
                     ''
                  )}

                  <div>
                     <div className='space-y-1 text-right'>
                        <label htmlFor='category'>
                           <span className='text-slate-600'>دسته بندی</span>
                        </label>
                        <select
                           disabled={isSubmitting}
                           className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                           value={values.category}
                           onChange={(e) => {
                              setFieldValue('category', e.target.value)
                           }}
                        >
                           <option value='' defaultChecked>
                              --
                           </option>
                           <option value='ورق سیاه'>ورق سیاه</option>
                           <option value='ورق روغنی'>ورق روغنی</option>
                           <option value='ورق گالوانیزه'>ورق گالوانیزه</option>
                           <option value='ورق اسپیره درجه دو'>ورق اسپیره درجه دو</option>
                        </select>
                     </div>

                     {errors.category && touched.category ? (
                        <p className='text-sm text-red-500'>{errors.category}</p>
                     ) : (
                        ''
                     )}
                  </div>

                  <div className='grid grid-cols-2 gap-5'>
                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='price'>
                              <span className='text-slate-600'>قیمت به تومان</span>
                           </label>
                           <input
                              name='price'
                              onChange={(e) => setFieldValue('price', e.target.value)}
                              value={values.price}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                           <p className='text-xs font-normal text-slate-400'>
                              {/* @ts-ignore */}
                              {parseInt(values.price).toLocaleString('fa')} تومان
                           </p>
                        </div>

                        {errors.price && touched.price ? (
                           <p className='text-sm text-red-500'>{errors.price}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='thickness'>
                              <span className='text-slate-600'>ضخامت به میلی متر</span>
                           </label>
                           <input
                              name='thickness'
                              onChange={(e) => setFieldValue('thickness', e.target.value)}
                              value={values.thickness}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.thickness && touched.thickness ? (
                           <p className='text-sm text-red-500'>{errors.thickness}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='length'>
                              <span className='text-slate-600'>طول به میلی متر</span>
                           </label>
                           <input
                              name='length'
                              onChange={(e) => setFieldValue('length', e.target.value)}
                              value={values.length}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.length && touched.length ? (
                           <p className='text-sm text-red-500'>{errors.length}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='width'>
                              <span className='text-slate-600'>عرض به میلی متر</span>
                           </label>
                           <input
                              name='width'
                              onChange={(e) => setFieldValue('width', e.target.value)}
                              value={values.width}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.width && touched.width ? (
                           <p className='text-sm text-red-500'>{errors.width}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='flex items-center gap-5'>
                           <span className='text-slate-600'>محصول نمایش داده شود</span>

                           <Switch
                              checked={values.active}
                              name='active'
                              color='success'
                              onChange={() => setFieldValue('active', !values.active)}
                           />
                        </div>

                        {!addingNewProduct && (
                           <span className='!my-0 flex justify-end text-right text-[.65rem] text-rose-400'>
                              میتوانید به جای حذف محصول آن را مخفی کنید
                           </span>
                        )}
                     </div>

                     <div className='flex items-center gap-5'>
                        <span className='text-slate-600'>محصول موجود است</span>

                        <Switch
                           checked={values.inStock}
                           name='inStock'
                           color='success'
                           onChange={() => setFieldValue('inStock', !values.inStock)}
                        />
                     </div>
                  </div>

                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='w-full rounded-lg border-2 border-green-600'
                  >
                     {isSubmitting ? <CircularProgress color='success' size={25} /> : 'ذخیره'}
                  </button>
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
