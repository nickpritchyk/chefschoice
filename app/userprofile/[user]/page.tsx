import Recipes from "../../components/Recipes"

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

type Params = {
    params: {
        user: string
    }
}

async function User({ params: {user}}: Params) {

  const recipes = await prisma.recipebook.findMany({
    where: {
      author: user
    }
  })

  return (
    <div className='flex flex-col justify-center h-fit w-full'>
      <h1 className="text-primary text-4xl place-self-center mt-8 p-4 border-2 shadow-lg rounded-md select-none"> Recipes by {user} </h1>
      <Recipes recipes={recipes} />
    </div>
  )
}

export default User