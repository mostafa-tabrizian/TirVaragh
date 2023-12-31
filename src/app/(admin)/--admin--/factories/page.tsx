import FactoryNewInput from './components/create'
import DeleteButton from './components/delete'
import NameActiveEdit from './components/nameActiveEdit'

import Factory from '@/models/factory'
import Product from '@/models/product'

import dbConnect from '@/lib/dbConnect'
import Image from 'next/image'
import ImageDelete from './components/imageDelete'
import ImageInput from './components/imageInput'

export const revalidate = 0

export const metadata = {
   title: 'پارس شیت | پنل ادمین | کارخانه ها',
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
      <>
         <FactoryNewInput />

         <div className='rtl mt-6'>
            <div className='mb-3 grid grid-cols-6 items-center justify-between rounded-lg p-5 py-2 text-center'>
               <p className='col-span-1 flex'>لوگو</p>
               <div className='col-span-3 grid grid-cols-3'>
                  <p className='col-span-2 flex'>نام</p>
                  <p className='col-span-1 flex'>فعال</p>
               </div>
               <p className='col-span-1'>محصولات</p>
            </div>

            <div className='space-y-3'>
               {factories.length ? (
                  factories.map((factory) => {
                     const productsLength = factoriesProductCount[factory._id] | 0
                     return (
                        <div
                           key={factory._id}
                           className='grid grid-cols-6 items-center justify-between rounded-lg bg-slate-50 p-2 text-center'
                        >
                           {factory.logo ? (
                              <div className='relative'>
                                 <Image
                                    src={`https://tabrizian.storage.iran.liara.space/tir-varagh/factories/${factory.logo}`}
                                    alt={factory.name}
                                    width={49}
                                    height={49}
                                    className='object-cover'
                                 />
                                 <ImageDelete
                                    imageKey={factory.logo}
                                    factoryId={String(factory._id)}
                                 />
                              </div>
                           ) : (
                              <ImageInput factoryId={String(factory._id)} />
                           )}
                           <NameActiveEdit params={JSON.parse(JSON.stringify({ ...factory }))} />

                           <p>{productsLength}</p>
                           <DeleteButton
                              params={JSON.parse(
                                 JSON.stringify({
                                    _id: factory._id,
                                    imageKey: factory.logo,
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
   )
}

export default AdminFactories
