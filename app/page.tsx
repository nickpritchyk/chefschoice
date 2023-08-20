import Recipes from './components/Recipes.jsx'
import Searchbar from './components/Searchbar.jsx'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



export default function Home() {

  return (
    <div className='flex flex-col h-full w-full bg-center bg-[url("assets/header1.png")] bg-cover'>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <h1 className='flex text-5xl text-white mb-52'>
          Find your favorite recipes here!
        </h1>
      </div>
    </div>
  )
}