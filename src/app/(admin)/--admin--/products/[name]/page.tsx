import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Product from '@/models/product'
import Category from '@/models/category'
import Brand from '@/models/brand'
import Model from '@/models/model'
import DetailProduct from '../components/detailForm'
import dehyphen from '@/lib/dehyphen'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = async (queries: any) => {
   await dbConnect()
   const results = await Promise.all(queries)
   return results
}

export const metadata = {
   title: 'تیرورق | ادمین | محصول',
}

const ProductPage = async ({ params: { name } }: { params: { name: string } }) => {
   const addingNewProduct = name === 'new'

   try {
      const [productsData, categories, brands, models] = await fetchData([
         Product.aggregate([
            { $match: { name: dehyphen(decodeURI(name)) } },
            {
               $lookup: {
                  from: 'categories',
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category',
               },
            },
            {
               $lookup: {
                  from: 'brands',
                  localField: 'brand',
                  foreignField: '_id',
                  as: 'brand',
               },
            },
            {
               $lookup: {
                  from: 'models',
                  localField: 'model',
                  foreignField: '_id',
                  as: 'model',
               },
            },
            {
               $limit: 1,
            },
         ]),
         Category.find(),
         Brand.find(),
         Model.find(),
      ])

      const product = productsData[0]

      return (
         <div className='mx-6 my-16 relative'>
            <div className='mx-6 md:mx-auto max-w-screen-xl space-y-10 my-16'>
               {product || addingNewProduct ? (
                  <>
                     <Breadcrumbs aria-label='breadcrumb'>
                        <Link className='text-gray-400' href='/'>
                           فروشگاه
                        </Link>
                        <Link className='text-gray-400' href='/--admin--'>
                           ادمین
                        </Link>
                        <Link className='text-gray-400' href='/--admin--/products'>
                           محصولات
                        </Link>
                        <h5 className='font-semibold rtl'>
                           {addingNewProduct ? 'افزودن محصول جدید' : product.name}
                        </h5>
                     </Breadcrumbs>

                     <div className='max-w-xl mx-auto'>
                        <Link href='/--admin--/products/new'>
                           <button className='bg-white z-10 border-2 border-blue-500 rounded-full p-3 fixed bottom-10 right-5'>
                              <svg
                                 className='h-6 w-6 text-blue-500'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 4v16m8-8H4'
                                 />
                              </svg>
                           </button>
                        </Link>

                        <DetailProduct
                           addingNewProduct={addingNewProduct}
                           product={addingNewProduct?null:JSON.parse(JSON.stringify(product))}
                           categories={JSON.parse(JSON.stringify(categories))}
                           brands={JSON.parse(JSON.stringify(brands))}
                           models={JSON.parse(JSON.stringify(models))}
                        />
                     </div>
                  </>
               ) : (
                  <h1>آیتم پیدا نشد!</h1>
               )}
            </div>
         </div>
      )
   } catch (error) {
      console.error('Error fetching data:', error)
      return
   }
}

export default ProductPage
