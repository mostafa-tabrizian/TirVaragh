'use client'

import { ICategory } from '@/models/category'
import { IFactory } from '@/models/factory'
import { IProduct } from '@/models/product'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
const MenuItem = dynamic(() => import('@mui/material/MenuItem'))
const Chart = dynamic(() => import('./chart'))

const PriceTables = () => {
   const [category, setCategory] = useState('')
   const [factoryFilter, setFactoryFilter] = useState('')
   const [sort, setSort] = useState('')

   // @ts-ignore
   const fetcher = (...args) => fetch(...args).then((res) => res.json())

   const {
      data: products,
      isLoading: isLoadingProducts,
   }: {
      data: IProduct[]
      isLoading: boolean
   } = useSWR(`/api/client/products?category=${category}`, fetcher)

   const [chartData, setChartData] = useState<IProduct | null>(null)

   const {
      data: categories,
      isLoading: isLoadingCategories,
   }: {
      data: ICategory[]
      isLoading: boolean
   } = useSWR('/api/client/categories', fetcher)

   const {
      data: factories,
      isLoading: isLoadingFactories,
   }: {
      data: IFactory[]
      isLoading: boolean
   } = useSWR('/api/client/factories', fetcher)

   const [sortedProducts, setSortedProducts] = useState<IProduct[] | []>([])
   const [productDetail, setProductDetail] = useState('')

   const fluctuationCalc = (
      a: { price: [{ value: number }] },
      b: { price: [{ value: number }] },
   ) => {
      const priceA = a.price[a.price.length - 1]
      const priceB = b.price[b.price.length - 1]
      const previousPriceA = a.price[a.price.length - 2]
      const previousPriceB = b.price[b.price.length - 2]

      let fluctuationA = 0
      let fluctuationB = 0

      if (previousPriceA) fluctuationA = priceA.value - previousPriceA.value
      if (previousPriceB) fluctuationB = priceB.value - previousPriceB.value

      return { fluctuationA, fluctuationB }
   }

   useEffect(() => {
      let sorted: IProduct[]

      switch (sort) {
         case 'mostExpensive':
            sorted =
               products &&
               [...products].sort(
                  (a, b) => b.price[b.price.length - 1].value - a.price[a.price.length - 1].value,
               )
            break
         case 'cheapest':
            sorted =
               products &&
               [...products].sort(
                  (a, b) => a.price[a.price.length - 1].value - b.price[b.price.length - 1].value,
               )
            break
         case 'mostVolatile':
            sorted =
               products &&
               [...products].sort((a, b) => {
                  const { fluctuationA, fluctuationB } = fluctuationCalc(a, b)
                  return fluctuationB - fluctuationA
               })
            break
         case 'leastVolatile':
            sorted =
               products &&
               [...products].sort((a, b) => {
                  const { fluctuationA, fluctuationB } = fluctuationCalc(a, b)
                  return fluctuationA - fluctuationB
               })
            break
         default:
            sorted = products
            break
      }

      setSortedProducts(sorted)
   }, [products, sort])

   return (
      <>
         <div
            style={{
               opacity: chartData ? '100%' : '0%',
               zIndex: chartData ? '30' : '-10',
            }}
            className='fixed left-0 top-0 h-full w-full bg-gray-800/60 backdrop-blur-sm transition-opacity duration-300'
         >
            <div className='relative top-1/2 h-1/2 w-full -translate-y-1/2 bg-slate-100 md:m-auto md:h-[80%] md:w-[60%] md:rounded-xl'>
               <div className='w-full text-end'>
                  <button
                     className='p-3'
                     onClick={() => setChartData(null)}
                     aria-label='close chart'
                  >
                     <svg
                        className='h-8 w-8 text-black'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M6 18L18 6M6 6l12 12'
                        />
                     </svg>
                  </button>
               </div>
               <span className='block text-center text-sm font-semibold md:text-base'>
                  نمودار قیمت {chartData?.title}
               </span>
               <Chart data={chartData?.price || null} />
            </div>
         </div>

         <div className='my-6 px-3 md:mx-auto md:mt-24 md:px-0' id='category'>
            <div>
               <div className='flex items-center gap-1'>
                  <span className='w-8 border-b-2 border-red-700'></span>
                  <span className='text-sm font-bold text-red-700'>تنوع در دسته بندی</span>
               </div>
               <div>
                  <h2 className='yekanExtraBold mt-2 text-4xl'>دسته بندی ها</h2>
               </div>
            </div>
            <div className='grid grid-cols-2 gap-x-3 md:mt-8 md:grid-cols-4 md:gap-10'>
               <button onClick={() => setCategory('655a4dc33996e920800f1521')}>
                  <a href='/#price-table'>
                     <Image
                        className='rounded-xl object-contain mix-blend-multiply'
                        src={'/category/blackSheet.jpg'}
                        alt='ورق سیاه'
                        width={460}
                        height={260}
                     />
                  </a>
               </button>
               <button onClick={() => setCategory('655b731798d59018976e66a3')}>
                  <a href='/#price-table'>
                     <Image
                        className='rounded-xl object-contain mix-blend-multiply'
                        src={'/category/oiledSheet.jpg'}
                        alt='ورق روغنی'
                        width={460}
                        height={260}
                     />
                  </a>
               </button>
               <button onClick={() => setCategory('655c5f85c48315aebd48442e')}>
                  <a href='/#price-table'>
                     <Image
                        className='rounded-xl object-contain mix-blend-multiply'
                        src={'/category/galvanizedSheet.jpg'}
                        alt='ورق گالوانیزه'
                        width={460}
                        height={260}
                     />
                  </a>
               </button>
               <button onClick={() => setCategory('655c5f94c48315aebd484435')}>
                  <a href='/#price-table'>
                     <Image
                        className='rounded-xl object-contain mix-blend-multiply'
                        src={'/category/spiraSheet.jpg'}
                        alt='ورق اسپیره'
                        width={460}
                        height={260}
                     />
                  </a>
               </button>
            </div>
         </div>

         <div className='mx-4 min-h-[50vh] md:mx-auto md:mt-24' id='price-table'>
            <div>
               <div className='flex items-center gap-1'>
                  <span className='w-8 border-b-2 border-red-700'></span>
                  <span className='text-sm font-bold text-red-700'>به روز و رقابتی</span>
               </div>
               <div>
                  <h2 className='yekanExtraBold mt-2 text-4xl'>جدول قیمت ورق</h2>
               </div>
            </div>
            <div className='mt-11 grid grid-cols-3 gap-3 md:flex md:justify-end md:gap-5'>
               <div className='rounded-xl bg-white'>
                  {isLoadingProducts ? (
                     <div className='grid h-14 w-32 items-center justify-center'>
                        <svg
                           className=' h-5 w-5 animate-spin text-slate-800'
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                        >
                           <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                           ></circle>
                           <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                           ></path>
                        </svg>
                     </div>
                  ) : (
                     <FormControl fullWidth>
                        <Select
                           labelId='مرتب سازی'
                           id='sort-products'
                           value={sort}
                           displayEmpty
                           onChange={(e) => setSort(e.target.value)}
                        >
                           <MenuItem value=''>
                              <span className='text-sm text-slate-500 md:text-base'>مرتب سازی</span>
                           </MenuItem>
                           <MenuItem value='cheapest'>ارزان ترین</MenuItem>
                           <MenuItem value='mostExpensive'>گران ترین</MenuItem>
                           <MenuItem value='mostVolatile'>پر نوسان ترین</MenuItem>
                           <MenuItem value='leastVolatile'>کم نوسان ترین</MenuItem>
                        </Select>
                     </FormControl>
                  )}
               </div>
               <div className='rounded-xl bg-white'>
                  {isLoadingCategories ? (
                     <div className='grid h-14 w-32 items-center justify-center'>
                        <svg
                           className=' h-5 w-5 animate-spin text-slate-800'
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                        >
                           <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                           ></circle>
                           <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                           ></path>
                        </svg>
                     </div>
                  ) : (
                     <FormControl fullWidth>
                        <Select
                           labelId='دسته بندی محصولات'
                           id='category'
                           value={category}
                           displayEmpty
                           onChange={(e) => setCategory(e.target.value)}
                        >
                           <MenuItem value=''>
                              <span className='text-sm text-slate-500 md:text-base'>دسته بندی</span>
                           </MenuItem>
                           {categories?.map((category, idx) => {
                              return (
                                 <MenuItem key={idx} value={category._id}>
                                    {category.name}
                                 </MenuItem>
                              )
                           })}
                        </Select>
                     </FormControl>
                  )}
               </div>
               <div className='rounded-xl bg-white'>
                  {isLoadingFactories ? (
                     <div className='grid h-14 w-24 items-center justify-center'>
                        <svg
                           className=' h-5 w-5 animate-spin text-slate-800'
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                        >
                           <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                           ></circle>
                           <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                           ></path>
                        </svg>
                     </div>
                  ) : (
                     <FormControl fullWidth>
                        <Select
                           labelId='کارخانه'
                           id='product-factories'
                           value={factoryFilter}
                           displayEmpty
                           onChange={(e) => setFactoryFilter(e.target.value)}
                        >
                           <MenuItem value=''>
                              <span className='text-sm text-slate-500 md:text-base'>کارخانه</span>
                           </MenuItem>
                           {factories?.map((factory, idx) => {
                              return (
                                 <MenuItem key={idx} value={factory._id}>
                                    {factory.name}
                                 </MenuItem>
                              )
                           })}
                        </Select>
                     </FormControl>
                  )}
               </div>
            </div>

            {isLoadingProducts || isLoadingFactories ? (
               <div className='mt-5 w-full rounded-xl bg-white py-32'>
                  <svg
                     className='mx-auto h-9 w-9 animate-spin text-slate-800'
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                  >
                     <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                     ></circle>
                     <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                     ></path>
                  </svg>
               </div>
            ) : (
               <>
                  {!sortedProducts?.length ? (
                     <div className='mt-24 w-full text-center'>
                        <span className='text-slate-600'>محصولی با این دسته بندی یافت نشد</span>
                     </div>
                  ) : (
                     factories?.map((factory, idx) => {
                        if (factoryFilter && factory._id !== factoryFilter) return

                        return (
                           <>
                              <div key={idx} className='mt-3'>
                                 <div>
                                    <div className='flex items-center gap-10 rounded-xl bg-white px-2 py-4'>
                                       <Image
                                          src={`https://tabrizian.storage.iran.liara.space/tir-varagh/factories/${factory.logo}`}
                                          alt={factory.name}
                                          width={49}
                                          height={49}
                                          className='object-cover'
                                       />
                                       <div>
                                          <h3 className='text-red-900'>
                                             قیمت{' '}
                                             {categories?.find((cat) => cat._id == category)
                                                ?.name || 'ورق های'}{' '}
                                             {factory.name}
                                          </h3>
                                          <div className='mt-1 flex items-center gap-1'>
                                             <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='13'
                                                height='12'
                                                viewBox='0 0 10 9'
                                                fill='none'
                                             >
                                                <path
                                                   d='M5 2.41412V4.53534H7.4'
                                                   stroke='#747474'
                                                   strokeLinecap='round'
                                                   strokeLinejoin='round'
                                                />
                                                <path
                                                   d='M5 8.07071C7.20912 8.07071 9 6.48786 9 4.53535C9 2.58283 7.20912 1 5 1C2.79086 1 1 2.58283 1 4.53535C1 6.48786 2.79086 8.07071 5 8.07071Z'
                                                   stroke='#747474'
                                                   strokeLinecap='round'
                                                   strokeLinejoin='round'
                                                />
                                             </svg>
                                             <span className='text-slate-500'>
                                                آخرین بروزرسانی :
                                             </span>
                                             <span className='text-red-700'>
                                                {new Date(factory.updatedAt)
                                                   .toLocaleDateString('fa', {
                                                      year: 'numeric',
                                                      month: 'numeric',
                                                      day: 'numeric',
                                                      hour: 'numeric',
                                                      minute: 'numeric',
                                                      second: 'numeric',
                                                      hour12: false,
                                                      calendar: 'persian',
                                                   })
                                                   .replace(',', ' - ')}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    {sortedProducts?.find(
                                       (product) => product.factory == factory._id,
                                    ) ? (
                                       <div className='mb-6 mt-3 rounded-xl bg-white'>
                                          <table className='w-full border-separate px-2'>
                                             <tr>
                                                <th
                                                   scope='col'
                                                   className='yekan1 p-2 text-right font-bold'
                                                >
                                                   عنوان{' '}
                                                   <span className='text-xs md:hidden'>
                                                      (برای جزئیات بیشتر کلیک کنید)
                                                   </span>
                                                </th>
                                                <th
                                                   scope='col'
                                                   className='yekan1 hidden p-2 font-bold md:table-cell'
                                                >
                                                   ضخامت <span className='text-xs'>(میلی‌متر)</span>
                                                </th>
                                                <th
                                                   scope='col'
                                                   className='yekan1 hidden p-2 font-bold md:table-cell'
                                                >
                                                   ابعاد <span className='text-xs'>(میلی‌متر)</span>
                                                </th>
                                                <th scope='col' className='yekan1 p-2 font-bold'>
                                                   قیمت <span className='text-xs'>(تومان)</span>
                                                </th>
                                                <th scope='col' className='yekan1 p-2 font-bold'>
                                                   نوسان
                                                </th>
                                                <th scope='col' className='yekan1 p-2 font-bold'>
                                                   نمودار
                                                </th>
                                             </tr>

                                             {sortedProducts?.map((product, idx) => {
                                                if (product.factory !== factory._id) return

                                                const price =
                                                   product.price[product.price.length - 1]
                                                const previousPrice =
                                                   product.price[product.price.length - 2]
                                                let fluctuation

                                                if (previousPrice) {
                                                   fluctuation = price.value - previousPrice.value
                                                }

                                                return (
                                                   <div
                                                      key={idx}
                                                      onClick={() =>
                                                         setProductDetail((prev) =>
                                                            prev == product._id ? '' : product._id,
                                                         )
                                                      }
                                                      className='table-row-group align-middle'
                                                   >
                                                      <tr
                                                         style={{
                                                            background:
                                                               idx % 2 == 0
                                                                  ? 'rgba(255, 232, 232, 0.38)'
                                                                  : 'none',
                                                         }}
                                                      >
                                                         <td className='yekan1 p-2 font-bold'>
                                                            {product.title}
                                                         </td>

                                                         <td className='yekan1 hidden p-2 text-center font-bold md:table-cell'>
                                                            {parseInt(
                                                               // @ts-ignore
                                                               product.thickness,
                                                            ).toLocaleString('fa')}
                                                         </td>

                                                         <td className='yekan1 hidden p-2 text-center font-bold md:table-cell'>
                                                            {parseInt(
                                                               // @ts-ignore
                                                               product.length,
                                                            ).toLocaleString('fa')}
                                                            x
                                                            {parseInt(
                                                               // @ts-ignore
                                                               product.width,
                                                            ).toLocaleString('fa')}
                                                         </td>

                                                         <td className='yekan1 p-2 text-center font-bold'>
                                                            {product.inStock ? (
                                                               // @ts-ignore
                                                               parseInt(price.value).toLocaleString(
                                                                  'fa',
                                                               )
                                                            ) : (
                                                               <span className='text-base font-normal text-slate-400'>
                                                                  ناموجود
                                                               </span>
                                                            )}
                                                         </td>

                                                         <td className='yekan1 m-auto p-2 text-center font-bold'>
                                                            {fluctuation && fluctuation > 0 ? (
                                                               <div className='flex items-center justify-center gap-x-1 text-green-600'>
                                                                  {parseInt(
                                                                     // @ts-ignore
                                                                     fluctuation,
                                                                  ).toLocaleString('fa')}
                                                                  <svg
                                                                     className='h-6 w-6'
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
                                                                     <path
                                                                        stroke='none'
                                                                        d='M0 0h24v24H0z'
                                                                     />{' '}
                                                                     <path d='M18 15l-6-6l-6 6h12' />
                                                                  </svg>
                                                               </div>
                                                            ) : (
                                                               ''
                                                            )}

                                                            {fluctuation && fluctuation < 0 ? (
                                                               <div className='flex items-center justify-center gap-x-1 text-red-500'>
                                                                  {parseInt(
                                                                     // @ts-ignore
                                                                     fluctuation,
                                                                  ).toLocaleString('fa')}
                                                                  <svg
                                                                     className='h-6 w-6'
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
                                                                     <path
                                                                        stroke='none'
                                                                        d='M0 0h24v24H0z'
                                                                     />{' '}
                                                                     <path
                                                                        d='M18 15l-6-6l-6 6h12'
                                                                        transform='rotate(180 12 12)'
                                                                     />
                                                                  </svg>
                                                               </div>
                                                            ) : (
                                                               ''
                                                            )}

                                                            {!fluctuation ? (
                                                               <span className='h-5 w-6 text-slate-600'>
                                                                  ---
                                                               </span>
                                                            ) : (
                                                               ''
                                                            )}
                                                         </td>
                                                         <td onClick={() => setChartData(product)}>
                                                            <svg
                                                               className='mx-auto h-6 w-6 text-black'
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
                                                               <path
                                                                  stroke='none'
                                                                  d='M0 0h24v24H0z'
                                                               />{' '}
                                                               <line
                                                                  x1='4'
                                                                  y1='19'
                                                                  x2='20'
                                                                  y2='19'
                                                               />{' '}
                                                               <polyline points='4 15 8 9 12 11 16 6 20 10' />
                                                            </svg>
                                                         </td>
                                                      </tr>
                                                      {productDetail == product._id ? (
                                                         <div className='relative right-2 table-cell border-r-2 pr-4 md:hidden'>
                                                            <p className='text-sm font-normal text-slate-500'>
                                                               ضخامت:{' '}
                                                               <span className='font-bold text-slate-500'>
                                                                  {product.thickness}
                                                               </span>{' '}
                                                               میلی متر
                                                            </p>
                                                            <p className='text-sm font-normal text-slate-500'>
                                                               ابعاد:{' '}
                                                               <span className='font-bold text-slate-500'>
                                                                  {product.width}
                                                               </span>
                                                               x
                                                               <span className='font-bold text-slate-500'>
                                                                  {product.length}
                                                               </span>{' '}
                                                               میلی متر
                                                            </p>
                                                         </div>
                                                      ) : (
                                                         ''
                                                      )}
                                                   </div>
                                                )
                                             })}
                                          </table>
                                       </div>
                                    ) : (
                                       <div className='bg-white px-2 py-4 text-center'>
                                          <span className='text-slate-600'>
                                             محصولی با این فیلتر از این کارخانه یافت نشد
                                          </span>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </>
                        )
                     })
                  )}
               </>
            )}
         </div>
      </>
   )
}

export default PriceTables
