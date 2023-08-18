import Image from 'next/image'
import header1 from './assets/header1.png'
import Autocomplete from '@mui/material/Autocomplete'
import Searchbar from './components/Searchbar.jsx'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



export default async function Home() {

  const recipes = await prisma.recipebook.findMany()

  return (
    <div className='flex h-full w-full bg-cover bg-center bg-[url("assets/header1.png")]'>
      <div className='grow'>
        <section className='flex flex-col items-center h-full bg-cover'>
          <Searchbar recipes={recipes}/>
        </section>
        <section className='h-full bg-cover bg-center bg-[url("assets/header2.png")]'>
          <h1 className='border-solid'></h1>
        </section>
      </div>
    </div>
  )
}