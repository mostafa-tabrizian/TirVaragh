import Link from 'next/link'

import BrandNewInput from './create'
import DeleteButton from './delete'
import NameAndSlug from './nameAndSlug'

import Brand from '@/models/brand'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

export const metadata = {
   title: '‌تیرورق | پنل ادمین | برند ها',
}

const getBrand = async () => {
   dbConnect()
   return await Brand.find()
}

const getBrandProductsCount = async () => {
   const brandProductCount: { [key: string]: number } = {}

   dbConnect()
   const products = await Product.find()

   products.map((product) => {
      const brandId = product.brand
      if (brandProductCount[brandId]) {
         brandProductCount[brandId] += 1
      } else {
         brandProductCount[brandId] = 1
      }
   })

   return brandProductCount
}

const AdminBrands = async () => {
   const brands = await getBrand()
   const brandProductCount = await getBrandProductsCount()

   return (
      <div className='mx-6 md:mx-auto my-16 max-w-screen-md space-y-10'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  تیرورق
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='font-semibold'>برند ها</h5>
            </Breadcrumbs>

            <BrandNewInput />

            <div className='rtl'>
               <div className='bg-white grid grid-cols-6 mb-3 justify-between rounded-lg p-5 py-2 text-center items-center'>
                  <div className='grid grid-cols-2 col-span-4'>
                     <p className='flex'>نام</p>
                     <p className='flex'>اسلاگ</p>
                  </div>
                  <p className='col-span-1'>محصولات</p>
               </div>

               <div className='space-y-3'>
                  {brands.length ? (
                     brands.map((brand) => {
                        const productsLength = brandProductCount[brand._id] | 0
                        return (
                           <div
                              key={brand._id}
                              className='bg-white grid grid-cols-6 justify-between rounded-lg p-2 text-center items-center'
                           >
                              <NameAndSlug params={JSON.parse(JSON.stringify({ ...brand }))} />
                              <Link
                                 href={`/search/${hyphen(brand.slug)}?type=brand&name=${
                                    brand.name
                                 }`}
                                 target='_blank'
                              >
                                 <p>{productsLength}</p>
                              </Link>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: brand._id,
                                       ableToDelete: productsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ برندی ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminBrands
