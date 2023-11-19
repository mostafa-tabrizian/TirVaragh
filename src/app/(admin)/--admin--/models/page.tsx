import Link from 'next/link'

import ModelNewInput from './create'
import DeleteButton from './delete'
import NameAndSlug from './nameAndSlug'
import CategoryInput from './category'

import Model from '@/models/model'
import Category from '@/models/category'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

export const metadata = {
   title: '‌تیرورق | پنل ادمین | مدل ها',
}

const getModels = async () => {
   dbConnect()

   const modelMatch = await Model.aggregate([
      {
         $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
         },
      },
   ])

   return modelMatch
}

const getCategories = async () => {
   dbConnect()
   return await Category.find()
}

const getModelProductsCount = async () => {
   const modelProductsCount: { [key: string]: number } = {}

   dbConnect()
   const products = await Product.find()

   products.map((product) => {
      const brandId = product.model
      if (modelProductsCount[brandId]) {
         modelProductsCount[brandId] += 1
      } else {
         modelProductsCount[brandId] = 1
      }
   })

   return modelProductsCount
}

const AdminCategories = async () => {
   const models = await getModels()
   const categories = await getCategories()
   const modelProductsCount = await getModelProductsCount()

   return (
      <div className='mx-6 md:mx-auto my-16 max-w-screen-lg space-y-10'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  فروشگاه
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='fondnt-semibold'>مدل ها</h5>
            </Breadcrumbs>

            <ModelNewInput />

            <div className='rtl'>
               <div className='bg-white grid grid-cols-8 mb-3 justify-between rounded-lg p-5 py-2 text-center items-center'>
                  <p className='col-span-2 flex'>دسته بندی</p>
                  <div className='grid grid-cols-2 col-span-4'>
                     <p className='flex'>نام</p>
                     <p className='flex'>اسلاگ</p>
                  </div>
                  <p className='col-span-1'>محصولات</p>
               </div>

               <div className='space-y-3'>
                  {models.length ? (
                     models.map((model) => {
                        const productsLength = modelProductsCount[model._id] | 0
                        return (
                           <div
                              key={model._id}
                              className='bg-white grid grid-cols-8 gap-10 justify-between rounded-lg p-2 text-center items-center'
                           >
                              <CategoryInput
                                 params={JSON.parse(
                                    JSON.stringify({
                                       modelId: model._id,
                                       currentCat: model.category[0],
                                       categories,
                                    }),
                                 )}
                              />
                              <NameAndSlug params={JSON.parse(JSON.stringify({ ...model }))} />
                              <Link
                                 href={`/search/${hyphen(model.slug)}?type=model&name=${
                                    model.name
                                 }`}
                                 target='_blank'
                              >
                                 <p>{productsLength}</p>
                              </Link>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: model._id,
                                       ableToDelete: productsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ مدل ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminCategories
