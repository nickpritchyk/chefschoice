import MySingleRecipe from '../../components/MySingleRecipe'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

type Params = {
    params: {
        recipe: string
    }
}

async function recipe({ params: {recipe}}: Params) {

  const singleRecipe = await prisma.recipebook.findUnique({
    where: {
      id: parseInt(recipe)
    }
  })

  const comments = await prisma.comments.findMany()

  return (
    <div className='flex justify-center h-fit w-full'>
      <MySingleRecipe singleRecipe={singleRecipe} />
    </div>
  )
}

export default recipe