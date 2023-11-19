import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Product from '@/models/product'
import DetailProduct from '../components/detailForm'

const fetchData = async (_id: string) => {
   await dbConnect()

   return Product.findOne({ _id })
}

export const metadata = {
   title: 'تیرورق | ادمین | محصول',
}

const ProductPage = async ({ params: { _id } }: { params: { _id: string } }) => {
   const addingNewProduct = _id === 'new'

   try {
      let product

      if (!addingNewProduct) {
         const productsData = await fetchData(_id)
         product = productsData
      }

      return (
         <div className='relative mx-6 my-16'>
            <div className='mx-6 my-16 max-w-screen-xl space-y-10 md:mx-auto'>
               {product || addingNewProduct ? (
                  <>
                     <Breadcrumbs aria-label='breadcrumb'>
                        <Link className='text-gray-400' href='/'>
                           تیرورق
                        </Link>
                        <Link className='text-gray-400' href='/--admin--'>
                           ادمین
                        </Link>
                        <Link className='text-gray-400' href='/--admin--/products'>
                           محصولات
                        </Link>
                        <h5 className='font-semibold'>
                           {addingNewProduct ? 'افزودن محصول جدید' : product._id}
                        </h5>
                     </Breadcrumbs>

                     <div className='mx-auto max-w-xl'>
                        <Link href='/--admin--/products/new'>
                           <button className='fixed bottom-10 right-5 z-10 rounded-full border-2 border-blue-500 bg-white p-3'>
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
                           product={addingNewProduct ? null : JSON.parse(JSON.stringify(product))}
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
