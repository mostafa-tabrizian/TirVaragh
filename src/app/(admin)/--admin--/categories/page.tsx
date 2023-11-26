import Link from 'next/link'
import CategoryNewInput from './components/create'
import DeleteButton from './components/delete'
import NameEdit from './components/nameEdit'
import Category from '@/models/category'
import Product from '@/models/product'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import dbConnect from '@/lib/dbConnect'

export const metadata = {
   title: 'تیرورق | پنل ادمین | دسته بندی ها',
   robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
         index: false,
         follow: false,
      },
   },
}

const getCategories = async () => {
   dbConnect()
   return await Category.find()
}

const getCategoryProductsCount = async () => {
   const categoriesProductCount: { [key: string]: number } = {}

   dbConnect()
   const products = await Product.find()

   products.map((product) => {
      const productCategory = product.category
      if (categoriesProductCount[productCategory]) {
         categoriesProductCount[productCategory] += 1
      } else {
         categoriesProductCount[productCategory] = 1
      }
   })

   return categoriesProductCount
}

const AdminCategories = async () => {
   const categories = await getCategories()
   const categoriesProductCount = await getCategoryProductsCount()

   return (
      <div className='mx-6 my-16 max-w-screen-sm space-y-10 md:mx-auto'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  تیرورق
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='font-semibold'>دسته بندی ها</h5>
            </Breadcrumbs>

            <CategoryNewInput />

            <div className='rtl'>
               <div className='mb-3 grid grid-cols-6 items-center justify-between rounded-lg bg-white p-5 py-2 text-center'>
                  <p className='col-span-4 flex'>نام</p>
                  <p className='col-span-1'>محصولات</p>
               </div>

               <div className='space-y-3'>
                  {categories.length ? (
                     categories.map((category) => {
                        const productsLength = categoriesProductCount[category._id] | 0
                        return (
                           <div
                              key={category._id}
                              className='grid grid-cols-6 items-center justify-between rounded-lg bg-white p-2 text-center'
                           >
                              <NameEdit params={JSON.parse(JSON.stringify({ ...category }))} />
                              <p>{productsLength}</p>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: category._id,
                                       ableToDelete: productsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ دسته بندی ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminCategories
