import EditRecipe from '../../components/EditRecipe'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function recipe() {
  const session = await getServerSession(options)

  const recipes = await prisma.recipebook.findMany({
    where: {
      userid: session.userid
    }
  })

  return (
    <div className='flex justify-center h-fit w-full'>
      <EditRecipe recipes={recipes}/>
    </div>
  )
}

export default recipe