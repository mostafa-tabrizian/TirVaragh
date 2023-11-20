import Link from 'next/link'

import FactoryNewInput from './components/create'
import DeleteButton from './components/delete'
import NameEdit from './components/nameEdit'

import Factory from '@/models/factory'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import dbConnect from '@/lib/dbConnect'
import Image from 'next/image'

export const metadata = {
   title: 'تیرورق | پنل ادمین | کارخانه ها',
}

const getFactories = async () => {
   dbConnect()
   return await Factory.find()
}

const getFactoryProductsCount = async () => {
   const factoriesProductCount: { [key: string]: number } = {}

   dbConnect()
   const products = await Product.find()

   products.map((product) => {
      const productFactory = product.factory
      if (factoriesProductCount[productFactory]) {
         factoriesProductCount[productFactory] += 1
      } else {
         factoriesProductCount[productFactory] = 1
      }
   })

   return factoriesProductCount
}

const AdminFactories = async () => {
   const factories = await getFactories()
   const factoriesProductCount = await getFactoryProductsCount()

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
               <h5 className='fondnt-semibold'>کارخانه ها</h5>
            </Breadcrumbs>

            <FactoryNewInput />

            <div className='rtl'>
               <div className='mb-3 grid grid-cols-6 items-center justify-between rounded-lg bg-white p-5 py-2 text-center'>
                  <p className='col-span-1 flex'>لوگو</p>
                  <p className='col-span-3 flex'>نام</p>
                  <p className='col-span-1'>محصولات</p>
               </div>

               <div className='space-y-3'>
                  {factories.length ? (
                     factories.map((factory) => {
                        const productsLength = factoriesProductCount[factory._id] | 0
                        return (
                           <div
                              key={factory._id}
                              className='grid grid-cols-6 items-center justify-between rounded-lg bg-white p-2 text-center'
                           >
                              <Image
                                 src={`https://tabrizian.storage.iran.liara.space/tir-varagh/factories/${factory.logo}`}
                                 alt={factory.name}
                                 width={49}
                                 height={49}
                                 className='object-cover'
                              />
                              <NameEdit params={JSON.parse(JSON.stringify({ ...factory }))} />
                              <p>{productsLength}</p>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: factory._id,
                                       ableToDelete: productsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ کارخانه ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminFactories
