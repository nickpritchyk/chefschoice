import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'
import Favorites from '../components/Favorites'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function favorites() {
  const session = await getServerSession(options)

  const recipes = await prisma.favorites.findMany({
    where: {
      usersid: session.userid
    },
    include: {
        recipebook: true
    }
  })

  return (
        <Favorites recipes={recipes} />
  )
}

export default favorites