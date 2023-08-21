import Recipes from '../components/Recipes'
import Searchbar from '../components/Searchbar';

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const revalidate = 0;

async function recipedeck() {
    const recipes = await prisma.recipebook.findMany({
        include: {
            comments: {
              select: {
                rating: true,
              },
            },
          },
    })
    console.log(recipes)

    const groupRating = await prisma.comments.groupBy({
        by: ['recipeid'],
        _sum: {
            rating: true,
          },
      })


    return (
        <div className='w-full h-full'>
            <Searchbar recipes={recipes}/>
        </div>
    )
}

export default recipedeck