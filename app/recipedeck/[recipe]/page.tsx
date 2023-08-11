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
      id: parseInt(recipe)
    }
  })

  return (
    <div className='flex justify-center h-fit w-full'>
      <SingleRecipe singleRecipe={singleRecipe}/>
    </div>
  )
}

export default recipe