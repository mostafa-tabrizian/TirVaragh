import Image from 'next/image'
// import limiter from '@/lib/limiter'
import Blog from '@/models/blog'

import Script from 'next/script'
import PriceTables from './components/priceTables'
import About from './components/about'
import BlogComponent from './components/blog'
import Factories from './components/factories'
import dbConnect from '@/lib/dbConnect'

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
   sameAs: ['https://www.instagram.com/sgpsteelco', 'https://t.me/sgpsteel', 'info@sgpsteel.com'],
   contactPoint: [
      {
         '@type': 'ContactPoint',
         telephone: '09124300703',
         contactType: 'واحد فروش',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '09127202381',
         contactType: 'واحد بازرگانی',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '02155445660',
         contactType: 'واحد دفتر',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '02155445868',
         contactType: 'واحد دفتر',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '02155228301',
         contactType: 'واحد تولید',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': '55228301-021',
         telephone: '02155228302',
         contactType: 'واحد تولید',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '09124242599',
         contactType: 'واحد انبار',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
   ],
   address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tehran Province, Tehran, Ahan Makan',
      addressLocality: 'Tehran, Iran',
      postalCode: '00000000',
      areaServed: {
         '@context': 'https://schema.org',
         '@type': 'Place',
         geo: {
            '@type': 'GeoCoordinates',
            latitude: '35.6110716',
            longitude: '51.3870155,16',
         },
         hasMap: 'https://maps.app.goo.gl/zNAqwgcccGyVqWAx7',
      },
      addressCountry: {
         '@type': 'Country',
         name: 'Iran',
      },
   },
}

export const revalidate = 1 * 24 * 60 * 60

const fetchData = async () => {
   await dbConnect()
   const blogs = await Blog.find({ active: true }).sort({ createdAt: -1 })

   return { blogs }
}

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

   const { blogs } = await fetchData()

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

         <div className='relative aspect-[16/8] w-full md:rounded-xl'>
            <Image
               className='object-cover md:rounded-xl'
               fill
               priority
               src='/hero.jpg'
               alt='قیمت لحظه ای ورق تمام کارخانه ها'
            />
         </div>

         <PriceTables />

         <About />

         {blogs.length ? <BlogComponent blogs={JSON.parse(JSON.stringify(blogs))} /> : ''}

         <Factories />
      </>
   )
}

export default Home
