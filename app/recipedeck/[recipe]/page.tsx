import SingleRecipe from '../../components/SingleRecipe'

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
      recipeid: parseInt(recipe)
    }
  })

  const singleRecipeComments = await prisma.comments.findMany({
    where: {
      recipeid: parseInt(recipe)
    }
  })

  const comments = await prisma.comments.findMany()

  return (
    <div className='flex justify-center h-fit w-full'>
      <SingleRecipe singleRecipe={singleRecipe} comments={comments} recipeid={recipe} singleRecipeComments={singleRecipeComments} />
    </div>
  )
}

export default recipe