import { IFactory } from '@/models/factory'
import Image from 'next/image'

const Factories = ({ factories }: { factories: IFactory[] }) => {
   return (
      <div className='mx-4 mt-14 md:mx-auto md:mt-24'>
         <div>
            <div className='mt-7 flex items-center gap-1'>
               <span className='w-8 border-b-2 border-red-700'></span>
               <span className='text-sm font-bold text-red-700'>بهترین های کشور</span>
            </div>
            <div>
               <h2 className='yekanExtraBold mt-2 text-3xl'>کارخانجات ورق</h2>
               <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
                  {factories.map((factory) => {
                     return (
                        <div key={factory._id} className='relative aspect-video h-20'>
                           <Image
                              src={`https://tabrizian.storage.iran.liara.space/tir-varagh/factories/${factory.logo}`}
                              alt={factory.name}
                              fill
                              className='object-contain mix-blend-multiply'
                           />
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Factories
