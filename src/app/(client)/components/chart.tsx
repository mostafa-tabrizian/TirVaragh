'use client'

import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const Chart = ({ data }: { data: { submittedAt: Date; value: number }[] | null }) => {
   const [range, setRange] = useState(1)
   const [rangedData, setRangedData] = useState<
      | {
           تاریخ: string
           قیمت: number
        }[]
      | []
   >([])

   useEffect(() => {
      let finalData

      if (range) {
         const currentDate = new Date()
         const fromDate = new Date(new Date().setMonth(currentDate.getMonth() - range))

         finalData = data?.filter(
            (item) =>
               new Date(item.submittedAt) >= fromDate && new Date(item.submittedAt) <= currentDate,
         )
      } else finalData = data

      const mappedData =
         finalData?.map((x) => {
            return { تاریخ: new Date(x.submittedAt).toLocaleDateString('fa'), قیمت: x.value }
         }) || []

      setRangedData(mappedData)
   }, [data, range])

   return (
      <div className='m-4 grid h-3/4 w-full items-center justify-center'>
         <AreaChart width={400} height={250} data={rangedData}>
            <defs>
               <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#5a9cff' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#3b9cff' stopOpacity={0} />
               </linearGradient>
            </defs>
            <XAxis dataKey='تاریخ' />
            <YAxis />
            <CartesianGrid strokeDasharray='4' vertical={false} />
            <Area
               type='monotone'
               dataKey='قیمت'
               stroke='#3499ff'
               fillOpacity={1}
               fill='url(#colorUv)'
            />
            <Tooltip />
         </AreaChart>

         <div className='mx-10 flex justify-around'>
            <button
               onClick={() => setRange(1)}
               style={{ border: range == 1 ? '2px solid rgb(12 74 110)' : '2px solid white' }}
               className='rounded-lg bg-white px-4 py-1'
            >
               ۱ ماه
            </button>
            <button
               onClick={() => setRange(6)}
               style={{ border: range == 6 ? '2px solid rgb(12 74 110)' : '2px solid white' }}
               className='rounded-lg bg-white px-4 py-1'
            >
               ۶ ماه
            </button>
            <button
               onClick={() => setRange(12)}
               style={{ border: range == 12 ? '2px solid rgb(12 74 110)' : '2px solid white' }}
               className='rounded-lg bg-white px-4 py-1'
            >
               ۱ سال
            </button>
            <button
               onClick={() => setRange(0)}
               style={{ border: range == 0 ? '2px solid rgb(12 74 110)' : '2px solid white' }}
               className='rounded-lg bg-white px-4 py-1'
            >
               همه
            </button>
         </div>
      </div>
   )
}

export default Chart
