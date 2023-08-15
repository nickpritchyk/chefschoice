import "@uploadthing/react/styles.css";
import './globals.css'
import Navbar from './components/Navbar'
import { StoreContextProvider } from './Context/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PT } from './fonts'
import AuthProvider from './components/AuthProvider';

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
        <AuthProvider>
          <StoreContextProvider>
            {children}  
          </StoreContextProvider>
          <Navbar />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  )
}
