import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'
import MyRecipeDeck from '../components/MyRecipeDeck'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const revalidate = 0;

async function myrecipes() {
  const session = await getServerSession(options)

  const recipes = await prisma.recipebook.findMany({
    where: {
      userid: session.userid
    }
  })

  return (
      <MyRecipeDeck recipes={recipes} />
  )
}

export default myrecipes