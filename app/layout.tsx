import './globals.css'
import Navbar from './components/Navbar'
import { StoreContextProvider } from './Context/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "@uploadthing/react/styles.css";
import { PT } from './fonts'

export const metadata = {
  title: 'Chefs Choice',
  description: 'Your stop for everything cooking.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={PT.className} lang="en">
      <body className=''>
        <StoreContextProvider>
          {children}
        </StoreContextProvider>
        <Navbar />
        <ToastContainer />
      </body>
    </html>
  )
}
