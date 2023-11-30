import Header from '../components/header'
import Footer from '../components/footer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />

         <main className='mx-auto mb-24 mt-32 max-w-screen-lg overflow-x-hidden'>{children}</main>

         <Footer />
      </>
   )
}
