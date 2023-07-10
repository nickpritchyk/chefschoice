import './globals.css'
import { PT_Serif } from 'next/font/google'
import Navbar from './components/Navbar'
import { StoreContextProvider } from './Context/store'

const PT = PT_Serif({
  weight: '400',
  subsets: ['latin'],
})

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
      <body>
        <StoreContextProvider>
          {children}
        </StoreContextProvider>
        <Navbar />
      </body>
    </html>
  )
}
