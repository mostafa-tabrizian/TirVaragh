'use client'

import { useEffect, useState, memo } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { IProduct } from '@/models/product'
import { ICategory } from '@/models/category'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

import { Switch } from '@mui/material'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'

import ImageInput from './imageInput'
import { ProductEditForm } from '@/formik/schema/validation'

const DetailForm = memo(
   ({
      addingNewProduct,
      product,
      categories,
      brands,
      models,
   }: {
      addingNewProduct: boolean
      product: IProduct
      categories: ICategory[]
      brands: IBrand[]
      models: IModel[]
   }) => {
      const [selectedCategoryId, selectCategoryId] = useState(
         // @ts-ignore
         addingNewProduct ? null : product.category[0]._id,
      )
      const [categoryModels, setCategoryModels] = useState([])

      const handleSubmit = async (
         values: {
            barcode: string
            name: string
            slug: string
            description: string
            category: object
            brand: object
            model: object
            price: number
            discount: number
            detail: object
            active: boolean
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
            else if (resData.message == 'notUnique')
               return toast.warning('بارکد یا اسلاگ از قبل ثبت شده است')
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

      useEffect(() => {
         return () => {
            setCategoryModels([])
         }
      }, [])

      useEffect(() => {
         const matchedCategoryModels: IModel[] = []

         models.map((model) => {
            if (model.category == selectedCategoryId) {
               matchedCategoryModels.push(model)
            }
         })

         // @ts-ignore
         setCategoryModels(matchedCategoryModels)
      }, [selectedCategoryId, models])

      return (
         <Formik
            initialValues={{
               barcode: addingNewProduct ? '' : product.barcode,
               name: addingNewProduct ? '' : product.name,
               slug: addingNewProduct ? '' : product.slug,
               description: addingNewProduct ? '' : product.description,
               // @ts-ignore
               category: addingNewProduct ? categories[0] : product.category[0],
               // @ts-ignore
               brand: addingNewProduct ? brands[0] : product.brand[0],
               // @ts-ignore
               model: addingNewProduct ? models[0] : product.model[0],
               price: addingNewProduct ? 0 : product.price,
               discount: addingNewProduct ? 0 : product.discount,
               // @ts-ignore
               detail: addingNewProduct
                  ? JSON.stringify({ عنوان: 'ارزش', عنوان۲: 'ارزش۲' })
                  : JSON.stringify(product.detail),
               active: addingNewProduct ? true : product.active,
               inStock: addingNewProduct ? true : product.inStock,
            }}
            validationSchema={ProductEditForm}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='grid grid-cols-3 gap-5 mt-6 '>
                  <div className='col-span-1'>
                     {addingNewProduct ? (
                        ''
                     ) : (
                        <ImageInput
                           product={JSON.parse(
                              JSON.stringify({
                                 _id: product._id,
                                 thumbnail: product.thumbnail,
                                 images: product.images,
                              }),
                           )}
                        />
                     )}
                  </div>
                  <div className='space-y-5 col-span-2'>
                     <div className='text-right space-y-1'>
                        <label htmlFor='barcode'>
                           <span className='text-slate-400'>کد محصول</span>
                        </label>
                        <input
                           name='barcode'
                           onChange={(e) =>
                              addingNewProduct && setFieldValue('barcode', e.target.value)
                           }
                           value={values.barcode}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                           readOnly={addingNewProduct ? false : true}
                        />
                     </div>

                     {errors.barcode && touched.barcode ? (
                        <p className='text-sm text-red-500'>{errors.barcode}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='name'>
                           <span className='text-slate-400'>عنوان محصول</span>
                        </label>
                        <input
                           name='name'
                           onChange={(e) => setFieldValue('name', e.target.value)}
                           value={values.name}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
                     </div>

                     {errors.name && touched.name ? (
                        <p className='text-sm text-red-500'>{errors.name}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='slug'>
                           <span className='text-slate-400'>اسلاگ محصول</span>
                        </label>
                        <input
                           name='slug'
                           onChange={(e) =>
                              addingNewProduct && setFieldValue('slug', e.target.value)
                           }
                           value={values.slug}
                           className='mr-3 w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                           readOnly={addingNewProduct ? false : true}
                        />
                     </div>

                     {errors.slug && touched.slug ? (
                        <p className='text-sm text-red-500'>{errors.slug}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='slug'>
                           <span className='text-slate-400'>توضیحات</span>
                        </label>
                        <textarea
                           name='description'
                           onChange={(e) => setFieldValue('description', e.target.value)}
                           rows={8}
                           value={values.description}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        />
                        <span className='text-slate-500 text-xs'>
                           تعداد کلمات توضیحات:{' '}
                           {(values.description.split(' ').length - 1).toLocaleString('fa')}
                        </span>
                     </div>

                     <div className=' border border-green-600/50 p-2 rounded-lg text-right'>
                        <span className='text-xs text-green-600/70'>
                           ترجیحا تعداد کلمات محصول می‌بایست ما بین ۵۰ تا ۳۰۰ کلمه باشد. کیفیت متن
                           دارای جزئیات و تعداد کلمات بیشتر، در عملکرد فروشگاه در گوگل تاثیر بسیار
                           مثبتی میگذارد
                        </span>
                     </div>

                     {errors.description && touched.description ? (
                        <p className='text-sm text-red-500'>{errors.description}</p>
                     ) : (
                        ''
                     )}

                     <Autocomplete
                        className='rtl'
                        id='category'
                        value={values.category as unknown as ICategory}
                        options={categories}
                        isOptionEqualToValue={(option, value) =>
                           option === value || option._id === value._id
                        }
                        getOptionLabel={(option: ICategory) => option.name}
                        onChange={(_e, value) => {
                           if (value) {
                              selectCategoryId(value._id)
                              setFieldValue('category', value)
                           }
                        }}
                        renderInput={(params) => <TextField {...params} label='دسته بندی' />}
                        sx={{ width: '100%' }}
                     />

                     {errors.category && touched.category ? (
                        // @ts-ignore
                        <p className='text-sm text-red-500'>{errors.category}</p>
                     ) : (
                        ''
                     )}

                     <Autocomplete
                        className='rtl'
                        id='brand'
                        value={values.brand as unknown as IBrand}
                        options={brands}
                        isOptionEqualToValue={(option, value) =>
                           option === value || option._id === value._id
                        }
                        getOptionLabel={(option: IBrand) => option.name}
                        onChange={(_e, value) => value && setFieldValue('brand', value)}
                        renderInput={(params) => <TextField {...params} label='برند' />}
                        sx={{ width: '100%' }}
                     />

                     {errors.brand && touched.brand ? (
                        // @ts-ignore
                        <p className='text-sm text-red-500'>{errors.brand}</p>
                     ) : (
                        ''
                     )}

                     <Autocomplete
                        className='rtl'
                        id='model'
                        value={values.model as unknown as IModel}
                        options={categoryModels}
                        isOptionEqualToValue={(option, value) =>
                           option === value || option._id === value._id
                        }
                        getOptionLabel={(option: IModel) => option.name}
                        onChange={(_e, value) => value && setFieldValue('model', value)}
                        renderInput={(params) => <TextField {...params} label='مدل' />}
                        sx={{ width: '100%' }}
                     />

                     {errors.model && touched.model ? (
                        // @ts-ignore
                        <p className='text-sm text-red-500'>{errors.model}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='price'>
                           <span className='text-slate-400'>قیمت به تومان</span>
                        </label>
                        <input
                           name='price'
                           onChange={(e) => setFieldValue('price', e.target.value)}
                           value={values.price}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='number'
                        />
                     </div>

                     {errors.price && touched.price ? (
                        <p className='text-sm text-red-500'>{errors.price}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='discount'>
                           <span className='text-slate-400'>تخفیف به تومان</span>
                        </label>
                        <input
                           name='discount'
                           onChange={(e) => setFieldValue('discount', e.target.value)}
                           value={values.discount}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='number'
                        />
                     </div>

                     {errors.discount && touched.discount ? (
                        <p className='text-sm text-red-500'>{errors.discount}</p>
                     ) : (
                        ''
                     )}

                     <div className='text-right space-y-1'>
                        <label htmlFor='detail'>
                           <span className='text-slate-400'>جزئیات با فرمت آبجکت</span>
                        </label>
                        <textarea
                           name='detail'
                           onChange={(e) => setFieldValue('detail', e.target.value)}
                           rows={8}
                           // @ts-ignore
                           value={values.detail}
                           className='mr-3 rtl w-full text-base tracking-widest bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        />
                     </div>

                     {errors.detail && touched.detail ? (
                        // @ts-ignore
                        <p className='text-sm text-red-500'>{errors.detail}</p>
                     ) : (
                        ''
                     )}

                     <div className='flex items-center gap-5 rtl'>
                        <span className='text-slate-400'>محصول نمایش داده شود</span>

                        <Switch
                           checked={values.active}
                           name='active'
                           color='success'
                           onChange={() => setFieldValue('active', !values.active)}
                        />
                     </div>

                     {!addingNewProduct && (
                        <span className='text-rose-400 flex justify-end !my-0 text-[.65rem] text-right'>
                           .محصولات قابل حذف نمی‌باشند. تنها میتوان آنها را مخفی کرد
                        </span>
                     )}

                     <div className='flex items-center gap-5 rtl'>
                        <span className='text-slate-400'>محصول موجود است</span>

                        <Switch
                           checked={values.inStock}
                           name='inStock'
                           color='success'
                           onChange={() => setFieldValue('inStock', !values.inStock)}
                        />
                     </div>

                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='border-2 border-green-600 w-full rounded-lg'
                     >
                        {isSubmitting ? <CircularProgress color='success' size={25} /> : 'ذخیره'}
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
