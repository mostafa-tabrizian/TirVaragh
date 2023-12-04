import dbConnect from '@/lib/dbConnect'
import limiter from '@/lib/limiter'
import Blog from '@/models/blog'
import Factory from '@/models/factory'
import Image from 'next/image'
import Script from 'next/script'
import About from './components/about'
import PriceTables from './components/priceTables'
import dynamic from 'next/dynamic'
const BlogComponent = dynamic(() => import('./components/blog'))
const Factories = dynamic(() => import('./components/factories'))

export const metadata = {
   title: 'پارس شیت | قیمت روز ورق کلیه کارخانه ها',
   description:
      'شرکت “صنعت‌ورق الغدیرپارس” که فعالیت خود را از ابتدای سال ۹۷ آغاز نموده قادر است به صورت تخصصی اقدام به فرآوری انواع ورق‌های نرم، روغنی و فول‌هارد نماید، این شرکت بعد از فرآیند تخصصی نورد مجدد آنها را بر اساس سفارش مشتری برش داده و به صورت شیت در اختیار مصرف‌کنندگان قرار می‌دهد. این شرکت درواقع فرآوری ضایعات شرکت‌های انواع تولیدکننده رول‌های سیاه و ورق‌های سرد می‌باشد به‌گونه‌ای که آنها را دریافت و سپس به انواع شیت تبدیل و آنگاه بر اساس ضخامت با عنوان ورق درجه دو و سه در اختیار مصرف‌کنندگان قرار می‌دهد. این کار در کشور حدود ۱۰ سال قدمت دارد و قبل از آن آنها را به صورت ضایعات مستعمل ذوب می‌نمودند، این نوع ورق‌ها هم فول‌هارد و هم روغنی دارد که ورق روغنی جهت استفاده در تولید اقلامی مانند اگزوز (منبع و لوله اگزوز)، درب ضد سرقت، قفسه‌سازی و… کاربرد فراوان دارد.',
   alternates: {
      canonical: 'https://parssheet.com',
   },
}

const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'WebSite',
   id: 'https://parssheet.com/#webSite',
   name: 'پارس شیت',
   url: 'https://parssheet.com',
}

const corporationJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Corporation',
   id: 'https://parssheet.com/#corporation',
   name: 'پارس شیت',
   alternateName: ['پارس شیت', 'parssheet'],
   legalName: 'پارس شیت',
   url: 'https://parssheet.com',
   logo: 'https://parssheet.com/logo-color.svg',
   email: 'info@parssheet.com',
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
   const factories = await Factory.find({ active: true }).sort({ createdAt: -1 })

   return { blogs, factories }
}

async function Home() {
   const remaining = await limiter.removeTokens(2)

   if (remaining < 0) {
      return (
         <h1 className='mx-10 my-20 max-w-screen-sm text-center md:mx-auto'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const { blogs, factories } = await fetchData()

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

         <div className='relative mx-auto aspect-[16/8] md:w-[80%] md:rounded-xl'>
            <Image
               className='object-cover shadow-lg md:rounded-xl'
               fill
               priority
               src='/hero2.jpg'
               alt='قیمت لحظه ای ورق تمام کارخانه ها'
            />
         </div>

         <PriceTables />

         <About />

         {blogs.length ? <BlogComponent blogs={JSON.parse(JSON.stringify(blogs))} /> : ''}

         {factories.length ? <Factories factories={JSON.parse(JSON.stringify(factories))} /> : ''}
      </>
   )
}

export default Home
