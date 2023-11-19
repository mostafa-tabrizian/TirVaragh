import Header from '../components/header'
import Footer from '../components/footer'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'
import Brand from '@/models/brand'

const getCategoriesAndBrands = async () => {
   dbConnect()
   const categories = await Category.find()
   const brands = await Brand.find()

   return { categories, brands }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const { categories, brands } = await getCategoriesAndBrands()

   return (
      <>
         <Header params={JSON.parse(JSON.stringify({ categories, brands }))} />

         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>

         <Footer />
      </>
   )
}
