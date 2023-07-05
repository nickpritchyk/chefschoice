import Image from 'next/image'
import header1 from './assets/header1.png'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'
import Searchbar from './components/Searchbar.jsx'

export default function Home() {
  return (
    <div className='flex h-full w-full'>
      <div className='grow'>
        <section className='flex flex-col items-center h-full bg-cover bg-center bg-[url("assets/header1.png")]'>
          <Searchbar />
        </section>
        <section className='h-full bg-cover bg-center bg-[url("assets/header2.png")]'>
          <h1 className='border-solid'> Chefs Choice </h1>
        </section>
      </div>
    </div>
  )
}