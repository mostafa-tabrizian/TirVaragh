import Link from 'next/link'
import Image from 'next/image'

import dbConnect from '@/lib/dbConnect'
// import limiter from '@/lib/limiter'
import Product from '@/models/product'

import Script from 'next/script'
import PriceTables from './components/priceTables'
import About from './components/about'
import Blog from './components/blog'
import Factories from './components/factories'

const getCategories = async () => {
   dbConnect()
   const cctv = await Product.find({
      category: '64fcaf60a459b97a56a24291',
   }).exec()

   return {
      cctv,
   }
}

export const metadata = {
   title: 'تیرورق | ""',
   description: '',
   alternates: {
      canonical: 'https://tirvaragh.com',
   },
}

const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'WebSite',
   id: 'https://tirvaragh.com/#webSite',
   name: 'تیرورق',
   url: 'https://tirvaragh.com',
}

const corporationJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Corporation',
   id: 'https://tirvaragh.com/#corporation',
   name: 'تیرورق',
   alternateName: ['تیرورق', 'TirVaragh'],
   legalName: 'تیرورق',
   url: 'https://tirvaragh.com',
   logo: '', // https://tirvaragh.com/_next/image?url=%2Flogo%2Flogo.jpg&w=96&q=100
   email: '',
   sameAs: [
      '', // https://www.instagram.com/TirVaragh
   ],
   contactPoint: [
      {
         '@type': 'ContactPoint',
         telephone: '', // +989128530920
         contactType: '', // customer service
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
   ],
   address: {
      '@type': 'PostalAddress',
      streetAddress: '', // Qom Province, Qom, Imam Reza Boulevard, Ferdows Residential Commercial Complex, Unit 229, First Floor
      addressLocality: '', // Qom, Iran
      postalCode: '', // 000000
      areaServed: {
         '@context': 'https://schema.org',
         '@type': 'Place',
         geo: {
            '@type': 'GeoCoordinates',
            latitude: '', // 34.6271489
            longitude: '', // 50.8490246
         },
         hasMap: '', // https://maps.app.goo.gl/RuiGssypE4p2WPrY9
      },
      addressCountry: {
         '@type': 'Country',
         name: 'Iran',
      },
   },
}

// export const revalidate = 1 * 24 * 60 * 60
export const revalidate = 0

async function Home() {
   // const remaining = await limiter.removeTokens(2)

   // if (remaining < 0) {
   //    return (
   //       <h1 className='mx-10 my-20 max-w-screen-sm text-center md:mx-auto'>
   //          متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
   //          امتحان کنید
   //       </h1>
   //    )
   // }

   return (
      <>
         <Script
            id='website-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />
         <Script
            id='corporation-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationJsonLd) }}
         />

         <div className='relative h-48 w-full'>
            <Image
               className=''
               fill
               priority
               src='/hero.jpg'
               alt='قیمت لحظه ای ورق تمام کارخانه ها'
               objectFit='cover'
            />
         </div>

         <div className='my-6 space-y-8 px-3 md:mx-auto md:px-0'>
            <div className='grid grid-cols-2 gap-x-3 md:grid-cols-4'>
               <Link aria-label='دسته بندی کابل' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/tirvaragh/category/cable.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی فیبر نوری' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/tirvaragh/category/fiberoptic.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی روتر' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/tirvaragh/category/router.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی سویتج' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/tirvaragh/category/switch.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
            </div>
         </div>

         <PriceTables />

         <About />

         <Blog />

         <Factories />
      </>
   )
}

export default Home
