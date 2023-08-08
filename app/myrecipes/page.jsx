import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'
import MyRecipeDeck from '../components/MyRecipeDeck'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function myrecipes() {
  const session = await getServerSession(options)

  const recipes = await prisma.recipebook.findMany({
    where: {
      userid: session.userid
    }
  })

  return (
    <div className="h-full w-full flex justify-center">
      <MyRecipeDeck recipes={recipes} />
    </div>
  )
}

export default myrecipes