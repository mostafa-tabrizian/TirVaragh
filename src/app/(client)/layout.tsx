import Header from '../components/header'
import Footer from '../components/footer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

   return (
      <>
         <Header />

         <main className='mb-24 max-w-screen-lg overflow-hidden mx-auto'>{children}</main>

         <Footer />
      </>
   )
}
